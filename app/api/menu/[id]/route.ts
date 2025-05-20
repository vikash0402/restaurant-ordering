import { status } from "@/app/constant/responseStatus";
import { errorMessage, menuItemMessage } from "@/app/constant/responseMessage";
import prisma from "@/lib/prisma";
import { menuItemErrorCode } from "@/app/constant/errorCode";
import { generateError } from "../../_lib";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const menuItems = await prisma.menuItem.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!menuItems) {
      return generateError(
        status.BAD_REQUEST,
        menuItemErrorCode.MENU_ITEM_ERR_CODE_004,
        "note found",
        errorMessage.MenuItem.NOT_FOUND
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        statusCode: status.SUCCESS,
        data: menuItems,
        message: menuItemMessage.FETCH_SUCCESS,
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
        errorMessage.General.BAD_REQUEST
      );
    }
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();
    const menuItems = await prisma.menuItem.update({
      where: {
        id: Number(id),
      },
      data: body,
    });

    if (!menuItems) {
      generateError(
        status.NOT_FOUND,
        menuItemErrorCode.MENU_ITEM_ERR_CODE_004,
        "Item not found",
        errorMessage.MenuItem.NOT_FOUND
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        statusCode: status.SUCCESS,
        data: menuItems,
        message: menuItemMessage.UPDATE_SUCCESS,
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
        errorMessage.MenuItem.UPDATE_FAILED
      );
    }
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();
    console.log(body);
    const menuItems = await prisma.menuItem.delete({
      where: {
        id: Number(id),
      },
    });

    if (menuItems) {
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
    }
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
