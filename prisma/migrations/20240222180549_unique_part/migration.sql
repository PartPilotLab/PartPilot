/*
  Warnings:

  - A unique constraint covering the columns `[productCode]` on the table `Parts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Parts_productCode_key" ON "Parts"("productCode");
