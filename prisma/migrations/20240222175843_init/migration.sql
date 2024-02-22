-- CreateTable
CREATE TABLE "Parts" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "productCode" TEXT NOT NULL,
    "productModel" TEXT NOT NULL,
    "productDescription" TEXT NOT NULL,
    "parentCatalogName" TEXT NOT NULL,
    "catalogName" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    "encapStandard" TEXT NOT NULL,
    "productImages" TEXT[],
    "pdfLink" TEXT NOT NULL,
    "productLink" TEXT NOT NULL,
    "prices" JSONB NOT NULL,
    "voltage" INTEGER,
    "capacitance" INTEGER,
    "current" INTEGER,
    "power" INTEGER,
    "resistance" INTEGER,
    "frequency" INTEGER,
    "tolerance" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Parts_pkey" PRIMARY KEY ("id")
);
