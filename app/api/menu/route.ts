import prisma from "@/lib/prisma";

export async function GET() {
  const menuItems = await prisma.menuItem.findMany();
  return new Response(JSON.stringify(menuItems), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
