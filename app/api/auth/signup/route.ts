import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

const saltRounds = 10;

interface ContactFormData {
  email: string;
  name: string;
  password: string;
}

export async function POST(request: Request) {
  const body: ContactFormData = await request.json();

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
