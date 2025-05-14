import { OrderCreateInput } from "@/app/interface/apiInterface/order.interface";
import prisma from "@/lib/prisma";

export async function GET() {
  const orders = await prisma.order.findMany({});

  return new Response(JSON.stringify(orders), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(request: Request) {
  const body: OrderCreateInput = await request.json();

  const { order, order_item } = body;
  console.log("body ", body);

  const newObj = order_item.map((item) => {
    delete item.orderId;
    return item;
  });

  const response = await prisma.order.create({
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

  console.log(response);

  return new Response(JSON.stringify(response), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
