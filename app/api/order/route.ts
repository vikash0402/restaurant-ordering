// import prisma from "@/lib/prisma";

export async function GET() {
  const order = {};
  // const orders = await prisma.order.findMany({})

  return new Response(JSON.stringify(order), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: Request) {
  const body: ContactFormData = await request.json();

  console.log("body ", body);
  const newOrder = {};

  return new Response(JSON.stringify(newOrder), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
