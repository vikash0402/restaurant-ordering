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

// const categoryData: Prisma.CategoryCreateInput[] = [
//   {
//     name: "starter",
//     description: "Food and beverages",
//   },
//   {
//     name: "main course",
//     description: "Food and beverages",
//   },
//   {
//     name: "dessert",
//     description: "Food and beverages",
//   },
//   {
//     name: "beverages",
//     description: "Food and beverages",
//   },
//   {
//     name: "snacks",
//     description: "Food and beverages",
//   },
// ];

const menuItems: Prisma.MenuItemCreateInput[] = [
  {
    name: "Spring Rolls",
    description: "Crispy vegetarian spring rolls",
    price: 5.99,
    image_url:
      "https://www.cubesnjuliennes.com/wp-content/uploads/2021/01/Veggie-Spring-Rolls.jpg",
    available: true,
    categoryId: 1,
  },
  {
    name: "Grilled Chicken",
    description: "Spicy grilled chicken with herbs",
    price: 12.99,
    image_url:
      "https://www.onceuponachef.com/images/2020/05/best-grilled-chicken-1200x1658.jpg",
    available: true,
    categoryId: 2,
  },
  {
    name: "Chocolate Lava Cake",
    description: "Warm cake with a molten chocolate center",
    price: 6.49,
    image_url:
      "https://www.foodnetwork.com/content/dam/images/food/fullset/2014/2/19/1/WU0701H_Molten-Chocolate-Cakes_s4x3.jpg",
    available: true,
    categoryId: 3,
  },
  {
    name: "Lemonade",
    description: "Refreshing homemade lemonade",
    price: 3.25,
    image_url:
      "https://cdn.loveandlemons.com/wp-content/uploads/2022/06/lemonade.jpg",
    available: true,
    categoryId: 4,
  },
  {
    name: "French Fries",
    description: "Crispy golden fries with ketchup",
    price: 4.5,
    image_url:
      "https://images.immediate.co.uk/production/volatile/sites/30/2021/03/French-fries-b9e3e0c.jpg",
    available: true,
    categoryId: 5,
  },
];

export async function main() {
  //   for (const u of userData) {
  //     await prisma.user.create({ data: u });
  //   };
  //   for (const c of customerData) {
  //     await prisma.customer.create({ data: c });
  //   }
  // for (const category of categoryData) {
  //   await prisma.category.create({ data: category });
  // }

  for (const menuItem of menuItems) {
    await prisma.menuItem.create({ data: menuItem });
  }
}

main();
