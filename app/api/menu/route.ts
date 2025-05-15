import { status } from "@/app/constant/responseStatus";
import { errorMessage, menuItemMessage } from "@/app/constant/responseMessage";
import prisma from "@/lib/prisma";
import { menuItemErrorCode } from "@/app/constant/errorCode";
import { generateError } from "@/app/api/_lib";

export async function GET() {
  try {
    const menuItems = await prisma.menuItem.findMany();

    return new Response(
      JSON.stringify({
        success: true,
        statusCode: status.SUCCESS,
        data: menuItems,
        message: menuItemMessage.FETCH_SUCCESS,
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
        errorMessage.General.BAD_REQUEST
      );
    }
  }
}

export async function POST(request: Request) {
  const body = await request.json();

  try {
    if (!body.id) {
      const response = await prisma.menuItem.create({
        data: {
          name: "",
          price: 0,
          available: true,
          categoryId: 0,
          description: "",
          image_url: "",
        },
      });

      return new Response(
        JSON.stringify({
          success: true,
          statusCode: status.CREATED,
          data: response,
          message: menuItemMessage.CREATE_SUCCESS,
        }),
        {
          status: status.CREATED,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const response = await prisma.menuItem.update({
      where: {
        id: body.id,
      },
      data: body,
    });

    return new Response(
      JSON.stringify({
        success: true,
        statusCode: status.SUCCESS,
        data: response,
        message: menuItemMessage.UPDATE_SUCCESS,
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
        status.BAD_REQUEST,
        menuItemErrorCode.MENU_ITEM_ERR_CODE_002,
        error.message,
        errorMessage.MenuItem.CREATE_FAILED
      );
    }
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    console.log(body);
    await prisma.menuItem.deleteMany({});
    return new Response(
      JSON.stringify({
        success: true,
        statusCode: status.NO_CONTENT,
        message: menuItemMessage.DELETE_SUCCESS,
      }),
      {
        status: status.NO_CONTENT,
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
        errorMessage.MenuItem.DELETE_FAILED
      );
    }
  }
}

// const generateSuccess = (
//   status: number,
//   errorcode: string,
//   errorMessage: string
// ) => {
//   return new Response(
//     JSON.stringify({
//       success: false,
//       status: status,
//       errorCode: errorcode,
//       message: errorMessage,
//     }),
//     {
//       status: status,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );
// };
