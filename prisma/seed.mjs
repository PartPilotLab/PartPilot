import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 10);

  await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {
      name: "John Doe",
      password: hashedPassword,
    },
    create: {
      email: "user@example.com",
      name: "John Doe",
      password: hashedPassword,
      Parts: {
        create: [
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
        ],
      },
    },
  });
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
