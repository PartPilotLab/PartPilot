/*
  Warnings:

  - A unique constraint covering the columns `[productCode,userId]` on the table `Parts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Parts` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Parts_productCode_key";

-- AlterTable
ALTER TABLE "Parts" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Parts_productCode_userId_key" ON "Parts"("productCode", "userId");

-- AddForeignKey
ALTER TABLE "Parts" ADD CONSTRAINT "Parts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
