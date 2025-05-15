/*
  Warnings:

  - A unique constraint covering the columns `[phone_number]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `phone_number` on the `Customer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_menuItemId_fkey";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "phone_number",
ADD COLUMN     "phone_number" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_phone_number_key" ON "Customer"("phone_number");

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
