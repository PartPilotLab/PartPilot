import { extractPartInfoFromLCSCResponse } from "@/lib/helper/lcsc_api";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const parts = await prisma.parts.findMany();
    console.log("RETURNING PARTS");
    return NextResponse.json({ status: 200, parts: parts });
  } catch (error: ErrorCallback | any) {
    return NextResponse.json({ status: 500, error: error });
  }
}

export async function POST(request: NextRequest) {
  console.log("API");
  try {
    const res = await request.json();
    console.log(res);

    const pcNumber = res.pc;
    console.log(pcNumber);
    const LSCSPart = await fetch(
      "https://wmsc.lcsc.com/wmsc/product/detail?productCode=" + pcNumber
    )
      .then((response) => {
        return response.json();
      })
      .catch((e: ErrorCallback | any) => {
        console.error(e.message);
      });
    const partInfo = extractPartInfoFromLCSCResponse(LSCSPart);
    console.log(partInfo);
    const partExists = await prisma.parts.findUnique({
      where: {
        productCode: partInfo.productCode,
      
      }
    });
    if(partExists){
      const partUpdate = await prisma.parts.update({
        where: {
          id: partExists.id,
        },
        data: {
          quantity: res.quantity + partExists.quantity,
        }
      });
      if (partUpdate) {
        return NextResponse.json({ status: 200, body: partUpdate, message: "Part updated"});
      }
      else {
        return NextResponse.json({ status: 500, error: "Part not updated" });
      }
    } else {
      const partCreate = await prisma.parts.create({
        data: {
          title: partInfo.title,
          quantity: res.quantity,
          productId: partInfo.productId,
          productCode: partInfo.productCode,
          productModel: partInfo.productModel,
          productDescription: partInfo.productDescription,
          parentCatalogName: partInfo.parentCatalogName,
          catalogName: partInfo.catalogName,
          brandName: partInfo.brandName,
          encapStandard: partInfo.encapStandard,
          productImages: partInfo.productImages,
          pdfLink: partInfo.pdfLink,
          productLink: partInfo.productLink,
          prices: partInfo.prices,
          voltage: partInfo.voltage,
          resistance: partInfo.resistance,
          power: partInfo.power,
          current: partInfo.current,
          tolerance: partInfo.tolerance,
          frequency: partInfo.frequency,
          capacitance: partInfo.capacitance,
        },
      });    
      if (partCreate) {
        return NextResponse.json({ status: 200, body: partCreate, message: "Part created"});
      } else {
        return NextResponse.json({ status: 500, error: "Part not created" });
      } 
    }
 



    // res.status(200).json(LSCSPart);
  } catch (error: ErrorCallback | any) {
    return NextResponse.json({ status: 500, error: error });

    // res.status(500).json({ message: e.message });
  }
}
