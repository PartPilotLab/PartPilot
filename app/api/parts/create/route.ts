import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
      const res = await request.json();
      const pcNumber = res.productCode;
      const partExists = await prisma.parts.findUnique({
        where: {
          productCode: pcNumber,
        
        }
      });
      if(partExists) {
        console.log("Part already exists")
        return NextResponse.json({ status: 500, error: "Part already exists" });

      } else {
        console.log("Creating part...")
        const partCreate = await prisma.parts.create({
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
          if (partCreate) {
            return NextResponse.json({ status: 200, body: partCreate, message: "Part created"});
          } else {
            return NextResponse.json({ status: 500, error: "Part not created" });
          } 
      }
    } catch (error: ErrorCallback | any) {}
    
    }