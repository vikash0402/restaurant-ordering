import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { ISignupInput } from "@/app/interface/apiInterface/auth.interface";

const saltRounds = 10;

export async function POST(request: Request) {
  const body: ISignupInput = await request.json();

  const { email, name, password } = body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  console.log({ email, name, password, hashedPassword });
  const paylaod = {
    email,
    name,
    password_hash: hashedPassword,
  };

  console.log("paylaod ", paylaod);

  const user = await prisma.admin.create({ data: paylaod });

  return new Response(JSON.stringify(user), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
