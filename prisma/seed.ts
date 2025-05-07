import { PrismaClient, Prisma } from "../app/generated/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

// const userData: Prisma.UserCreateInput[] = [
//   {
//     name: "Alice",
//     email: "alice@prisma.io",
//     posts: {
//       create: [
//         {
//           title: "Join the Prisma Discord",
//           content: "https://pris.ly/discord",
//           published: true,
//         },
//         {
//           title: "Prisma on YouTube",
//           content: "https://pris.ly/youtube",
//         },
//       ],
//     },
//   },
//   {
//     name: "Bob",
//     email: "bob@prisma.io",
//     posts: {
//       create: [
//         {
//           title: "Follow Prisma on Twitter",
//           content: "https://www.twitter.com/prisma",
//           published: true,
//         },
//       ],
//     },
//   },
// ];

// const customerData: Prisma.CustomerCreateInput[] = [
//   {
//     name: "John Doe",
//     phone_number: "1234567890",
//   },
//   {
//     name: "Jane Smith",
//     phone_number: "0987654321",
//   },
// ];

const categoryData: Prisma.CategoryCreateInput[] = [
  {
    name: "starter",
    description: "Food and beverages",
  },
  {
    name: "main course",
    description: "Food and beverages",
  },
  {
    name: "dessert",
    description: "Food and beverages",
  },
  {
    name: "beverages",
    description: "Food and beverages",
  },
  {
    name: "snacks",
    description: "Food and beverages",
  },
];

export async function main() {
  //   for (const u of userData) {
  //     await prisma.user.create({ data: u });
  //   };
  //   for (const c of customerData) {
  //     await prisma.customer.create({ data: c });
  //   }
  for (const category of categoryData) {
    await prisma.category.create({ data: category });
  }
}

main();
