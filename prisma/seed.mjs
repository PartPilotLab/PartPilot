import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const parts = [
    {
      productCode: "C1591",
      productModel: "CL10B104KB8NNNC",
      quantity: 2,
      capacitance: 1,
      prices: [],
    },
    {
      productCode: "C154120",
      productModel: "SDFL2012T150KTF",
      quantity: 20,
      capacitance: 1,
      prices: [],
    },
    {
      productCode: "C29538",
      productModel: "X322530MSB4SI",
      quantity: 5,
      capacitance: 1,
      prices: [],
    },
  ];

  for (const part of parts) {
    const existingPart = await prisma.parts.findFirst({
      where: {
        productCode: part.productCode,
        userId: null,
      },
    });

    if (existingPart) {
      await prisma.parts.update({
        where: { id: existingPart.id },
        data: part,
      });
    } else {
      await prisma.parts.create({
        data: { ...part, userId: null },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
