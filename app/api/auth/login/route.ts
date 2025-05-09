import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

interface ContactFormData {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  const body: ContactFormData = await request.json();

  try {
    const { email, password } = body;

    const existingUser: {
      email: string;
      id: number;
      name: string;
      password_hash: string;
      createdAt: Date;
    } | null = await prisma.admin.findFirst({ where: { email: email } });

    if (!existingUser) return throwError(400, "no user present for this email");

    if (existingUser?.password_hash) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password_hash
      );

      if (!isPasswordCorrect) {
        return throwError(400, "pasword not match");
      }
    }

    const user = { message: "user successfully logged in" };

    return new Response(JSON.stringify(user), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return throwError(500, errorMessage);
  }
}

const throwError = (status: number, message: string) => {
  return new Response(JSON.stringify({ message: message }), {
    status: status,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
