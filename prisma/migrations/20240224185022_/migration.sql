/*
  Warnings:

  - You are about to alter the column `voltage` on the `Parts` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `capacitance` on the `Parts` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `current` on the `Parts` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `power` on the `Parts` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `resistance` on the `Parts` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `frequency` on the `Parts` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Parts" ALTER COLUMN "voltage" SET DATA TYPE INTEGER,
ALTER COLUMN "capacitance" SET DATA TYPE INTEGER,
ALTER COLUMN "current" SET DATA TYPE INTEGER,
ALTER COLUMN "power" SET DATA TYPE INTEGER,
ALTER COLUMN "resistance" SET DATA TYPE INTEGER,
ALTER COLUMN "frequency" SET DATA TYPE INTEGER;
