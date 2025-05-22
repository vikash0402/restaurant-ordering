import { menuItemErrorCode, orderErrorCode } from "@/app/constant/errorCode";
import {
  errorMessage,
  orderItemMessage,
  orderMessage,
  paymentMessage,
} from "@/app/constant/responseMessage";
import { status } from "@/app/constant/responseStatus";
import { generateError } from "../../_lib";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const orders = await prisma.order.findFirst({
      where: {
        id: Number(id),
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
        transactions: true,
      },
    });

    if (!orders) {
      throw new Error(`Order details not found orders id ${id}`);
    }

    const orderItemsList = orders?.orderItems.map((orderItem) => ({
      key: `${orderItem.quantity} ⨯ ${orderItem.item.name}`,
      value: orderItem.unit_price * orderItem.quantity,
    }));

    const charges = [
      {
        key: "Item Bill",
        value: orders?.total_amount,
      },
      {
        key: "Delivery charge",
        value: orders?.delivery_charge,
      },
      {
        key: "Platform charge",
        value: orders?.platform_charge,
      },
      {
        key: "SMS Charge",
        value: orders?.sms_charge,
      },
    ];

    const orderDetails = {
      transactionId: orders?.transactions[0]?.rozer_transation_id,
      itemDetails: orderItemsList,
      chargeDetails: charges,
      status: orders?.status,
      total: charges
        .reduce((acc, charge) => acc + (charge.value ?? 0), 0)
        .toFixed(2),
    };

    console.log({ orderDetails });

    return new Response(
      JSON.stringify({
        success: true,
        statusCode: status.SUCCESS,
        data: orderDetails,
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

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { id } = await params;

    console.log({ id });
    console.log({ body });

    const order = await prisma.order.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        customer: {
          select: {
            id: true,
          },
        },
      },
    });

    if (body.status === "PAID") {
      const updateOrder = await prisma.order.update({
        where: {
          id: Number(id),
        },
        data: {
          status: "PAID",
          payment_status: true,
        },
      });

      let transaction;
      if (updateOrder) {
        transaction = await prisma.transaction.create({
          data: {
            orderId: Number(id),
            amount: updateOrder.total_amount,
            rozer_transation_id: body.paymentId,
            status: "PAID",
          },
        });
      }
      console.log(transaction);
      console.log({ updateOrder });

      const payload = {
        redirect_path: `/menu/orders?customerId=${order?.customer.id}`,
      };

      return new Response(
        JSON.stringify({
          success: true,
          statusCode: status.SUCCESS,
          data: payload,
          message: paymentMessage.PAYMENT_SUCCESS,
        }),
        {
          status: status.SUCCESS,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (!order) {
      return generateError(
        status.NOT_FOUND,
        menuItemErrorCode.MENU_ITEM_ERR_CODE_004,
        "Order not found",
        errorMessage.MenuItem.NOT_FOUND
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        statusCode: status.SUCCESS,
        data: order,
        message: orderItemMessage.UPDATE_SUCCESS,
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
        menuItemErrorCode.MENU_ITEM_ERR_CODE_002,
        error.message,
        errorMessage.Order.UPDATE_FAILED
      );
    }
  }
}
