import { extractPartInfoFromLCSCResponse } from "@/lib/helper/lcsc_api";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { NextApiRequest } from "next";

export async function GET(request: NextRequest) {
  try {
   
    const {searchParams} = new URL(request.url);
    const page = searchParams.get("page");
    const parts = await prisma.parts.findMany({orderBy: {id: 'desc'}, take: 10, skip: page ? (parseInt(page) - 1) * 10 : 0});
    return NextResponse.json({ status: 200, parts: parts });
  } catch (error: ErrorCallback | any) {
    return NextResponse.json({ status: 500, error: error });
  }
}

export async function POST(request: NextRequest) {
  try {
    const res = await request.json();
    const pcNumber = res.pc;
    const partExists = await prisma.parts.findUnique({
      where: {
        productCode: pcNumber,
      
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
          inductance: partInfo.inductance,
        },
      });
      const itemCount = await prisma.parts.aggregate({_count: true}); 
      const parentCatalogNamesRaw = await prisma.parts.groupBy({by: ['parentCatalogName']})
      const parentCatalogNames = parentCatalogNamesRaw.map(item => item.parentCatalogName);
      if (partCreate) {
        return NextResponse.json({ status: 200, body: partCreate, itemCount: itemCount._count, parentCatalogNames: parentCatalogNames, message: "Part created"});
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
