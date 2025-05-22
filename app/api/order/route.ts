import { orderErrorCode } from "@/app/constant/errorCode";
import { errorMessage, orderMessage } from "@/app/constant/responseMessage";
import { status } from "@/app/constant/responseStatus";
import {
  OrderCreateInput,
  OrderItemWithName,
} from "@/app/interface/apiInterface/order.interface";
import prisma from "@/lib/prisma";
import { generateError } from "../_lib";

function formatDate(isoDateString: string): string {
  const date = new Date(isoDateString);

  type optionalType = "numeric" | "2-digit" | undefined;

  interface IOptions {
    day: optionalType;
    month: optionalType | "short" | "long" | "narrow";
    hour: optionalType;
    minute: optionalType;
    hour12: boolean;
  }
  const options: IOptions = {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formatted = date.toLocaleString("en-US", options);

  return formatted;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const customerId = searchParams.get("customerId"); // Access the value of the 'query' parameter

  console.log({ customerId });

  try {
    const orders = await prisma.order.findMany({
      where: {
        customerId: Number(customerId),
      },
      include: {
        orderItems: {
          include: {
            item: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    interface Orders {
      orderId: number;
      orderItem: string;
      total: number;
      date: string;
      status: boolean;
    }

    const createOrderString = (orderItems: OrderItemWithName[]): string => {
      const orderArr = orderItems.map((el) => {
        return `${el.quantity} ⨯ ${el.item?.name}`;
      });
      const orderStr = orderArr.join(", ");
      return orderStr;
    };

    const allOrders: Orders[] = orders.map((order) => ({
      orderId: order.id,
      orderItem: createOrderString(order.orderItems),
      total:
        order.total_amount +
        order.platform_charge +
        order.sms_charge +
        order.delivery_charge,
      date: formatDate(order.createdAt.toISOString()),
      status: order.status === "PAID",
    }));

    return new Response(
      JSON.stringify({
        success: true,
        statusCode: status.SUCCESS,
        data: allOrders,
        message: orderMessage.FETCH_SUCCESS,
      }),
      {
        status: status.SUCCESS,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      return generateError(
        status.BAD_REQUEST,
        orderErrorCode.ORDER_ERR_CODE_002,
        error.message,
        errorMessage.OrderItem.NOT_FOUND
      );
    }
  }
}

export async function POST(request: Request) {
  const body: OrderCreateInput = await request.json();

  try {
    const { order, order_item } = body;
    console.log("body ", body);

    const newObj = order_item.map((item) => {
      delete item.orderId;
      return item;
    });

    const pendingOrder = await prisma.order.findFirst({
      where: {
        customerId: Number(order.customerId),
        status: "PENDING",
      },
    });

    let updatedResposne;

    if (pendingOrder) {
      // updatedResposne = await prisma.order.update({
      //   where: {
      //     id: pendingOrder.id,
      //   },
      //   data: {
      //     total_amount: order.total_amount,
      //     orderItems: {console.log("new order create  ", newOrder.id);
      //       create: order_item,
      //     },
      //   },
      //   include: {
      //     orderItems: true,
      //   },
      // });

      const deleteOrder = await prisma.$transaction([
        prisma.orderItem.deleteMany({
          where: {
            orderId: pendingOrder.id,
          },
        }),
        prisma.order.delete({
          where: {
            id: pendingOrder.id,
          },
        }),
      ]);

      console.log("pending order id get deleted ", pendingOrder.id);

      console.log({ deleteOrder });
    }

    if (updatedResposne)
      return new Response(
        JSON.stringify({
          success: true,
          statusCode: status.SUCCESS,
          data: updatedResposne,
          message: orderMessage.UPDATE_SUCCESS,
        }),
        {
          status: status.SUCCESS,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

    const newOrder = await prisma.order.create({
      data: {
        delivery_charge: order.delivery_charge,
        platform_charge: order.platform_charge,
        sms_charge: order.sms_charge,
        total_amount: order.total_amount,
        customerId: Number(order.customerId),
        payment_status: order.payment_status,
        status: "PENDING",
        orderItems: {
          create: newObj,
        },
      },
      include: {
        orderItems: true,
      },
    });

    console.log("new order create  ", newOrder.id);

    return new Response(
      JSON.stringify({
        success: true,
        statusCode: status.CREATED,
        data: newOrder,
        message: orderMessage.CREATE_SUCCESS,
      }),
      {
        status: status.CREATED,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      return generateError(
        status.INTERNAL_SERVER_ERROR,
        orderErrorCode.ORDER_ERR_CODE_002,
        error.message,
        errorMessage.OrderItem.UPDATE_FAILED
      );
    }
  }
}
