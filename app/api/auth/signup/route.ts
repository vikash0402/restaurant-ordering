import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { ISignupInput } from "@/app/interface/apiInterface/auth.interface";
import { signupSchema } from "@/app//valiadation/server/auth";
import { status } from "@/app/constant/responseStatus";
import { authErrorCode } from "@/app/constant/errorCode";
import { errorMessage, userMessage } from "@/app/constant/responseMessage";
import { generateError } from "@/app/api/_lib";
import { z } from "zod";

const saltRounds = 10;

type SignupRequest = z.infer<typeof signupSchema>;

export async function POST(request: Request) {
  try {
    const body: ISignupInput = await request.json();
    const singupValidation: SignupRequest = signupSchema.parse(body);
    const { email, name, password } = singupValidation;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const paylaod = {
      email,
      name,
      password_hash: hashedPassword,
    };

    console.log("paylaod ", paylaod);

    const user = await prisma.admin.create({ data: paylaod });

    return new Response(
      JSON.stringify({
        success: true,
        statusCode: status.CREATED,
        data: user,
        message: userMessage.SIGNUP_SUCCESS,
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
        authErrorCode.AUTH_ERR_CODE_002,
        error.message,
        errorMessage.General.BAD_REQUEST
      );
    }
  }
}
