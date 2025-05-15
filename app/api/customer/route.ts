import { ICreateInput } from "@/app/interface/apiInterface/customer.interface";
import prisma from "@/lib/prisma";

export async function GET() {
  const allCustomer = await prisma.customer.findMany({});

  console.log({ allCustomer });

  return new Response(JSON.stringify(allCustomer), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(request: Request) {
  const body: ICreateInput = await request.json();

  console.log({ body });
  const { name, phone_number } = body;
  console.log(typeof name, typeof phone_number);

  const customer = await prisma.customer.findFirst({
    where: {
      phone_number: Number(phone_number),
    },
  });

  if (customer) {
    console.log("existing customer ", customer);

    return new Response(JSON.stringify(customer), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const payload = {
    name,
    phone_number: Number(phone_number),
  };

  const newCustomer = await prisma.customer.create({
    data: payload,
  });

  console.log({ newCustomer });

  return new Response(JSON.stringify(newCustomer), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { id } = body;

  try {
    const response = await prisma.customer.delete({
      where: {
        id: Number(id),
      },
    });

    if (!response) {
      throw new Error("no customer exist");
    }
    return new Response(
      JSON.stringify({ message: "customer sucessfully deleted" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 500,
        headers: {
          "Content-Type": "applicaiton/json",
        },
      });
    }
  }
}
