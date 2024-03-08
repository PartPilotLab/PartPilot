import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const res = await request.json();
    const partId = res.id;
    const updatedPart = await prisma.parts.update({
      where: {
        id: partId,
      },
      data: {
        title: res.title,
        quantity: res.quantity,
        productId: res.productId,
        productCode: res.productCode,
        productModel: res.productModel,
        productDescription: res.productDescription,
        parentCatalogName: res.parentCatalogName,
        catalogName: res.catalogName,
        brandName: res.brandName,
        encapStandard: res.encapStandard,
        productImages: res.productImages,
        pdfLink: res.pdfLink,
        productLink: res.productLink,
        prices: res.prices,
        voltage: res.voltage,
        resistance: res.resistance,
        power: res.power,
        current: res.current,
        tolerance: res.tolerance,
        frequency: res.frequency,
        capacitance: res.capacitance,
      },
    });
    if(updatedPart){
      return NextResponse.json({ status: 200, body: updatedPart, message: "Part updated"});
    }
    else {
      return NextResponse.json({ status: 500, error: "Part not updated" });
    }
} catch (error: ErrorCallback | any) {
    return NextResponse.json({ status: 500, error: error });
  }
}
