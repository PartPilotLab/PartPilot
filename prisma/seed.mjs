import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    await prisma.parts.upsert({
        where: {productCode: 'C1591'},
        update: {},
        create: {
            productCode: 'C1591',
            productModel: 'CL10B104KB8NNNC',
            quantity: 2,
            capacitance: 1,
            prices: []
        },
    })
    await prisma.parts.upsert({
        where: {productCode: 'C154120'},
        update: {},
        create: {
            productCode: 'C154120',
            productModel: 'SDFL2012T150KTF',
            quantity: 20,
            capacitance: 1,
            prices: []
        },
    })
    await prisma.parts.upsert({
        where: {productCode: 'C29538'},
        update: {},
        create: {
            productCode: 'C29538',
            productModel: 'X322530MSB4SI',
            quantity: 5,
            capacitance: 1,
            prices: []
        },
    })
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})
