import { ILoginInput } from "@/app/interface/apiInterface/auth.interface";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { generateError } from "@/app/api/_lib";
import { status } from "@/app/constant/responseStatus";
import { authErrorCode } from "@/app/constant/errorCode";
import { errorMessage, userMessage } from "@/app/constant/responseMessage";

export async function POST(request: Request) {
  const body: ILoginInput = await request.json();

  try {
    const { email, password } = body;

    const existingUser: {
      email: string;
      id: number;
      name: string;
      password_hash: string;
      createdAt: Date;
    } | null = await prisma.admin.findFirst({ where: { email: email } });

    if (!existingUser)
      return generateError(
        status.NOT_FOUND,
        authErrorCode.AUTH_ERR_CODE_004,
        "No user present for this email",
        errorMessage.User.NOT_FOUND
      );

    if (existingUser?.password_hash) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password_hash
      );

      if (!isPasswordCorrect)
        return generateError(
          status.UNAUTHORIZED,
          authErrorCode.AUTH_ERR_CODE_006,
          "pasword not match",
          errorMessage.Auth.INVALID_CREDENTIALS
        );
    }

    const user = { message: "user successfully logged in" };

    return new Response(
      JSON.stringify({
        success: true,
        statusCode: status.SUCCESS,
        data: user,
        message: userMessage.LOGIN_SUCCESS,
      }),
      {
        status: status.SUCCESS,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return generateError(
        status.INTERNAL_SERVER_ERROR,
        authErrorCode.AUTH_ERR_CODE_001,
        error.message,
        errorMessage.User.VALIDATION_FAILED
      );
    }
  }
}
