import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

//Manually create a part

export async function POST(request: NextRequest) {
  try {
    //Request body containing part details
    const reqBody = await request.json();

    console.log(reqBody)
    //Check if part already exists
    const pcNumber = reqBody.productCode;
    const partExists = await prisma.parts.findUnique({
      where: {
        productCode: pcNumber,
      },
    });
    if (partExists) {
      console.log("Part already exists");
      return NextResponse.json({error: "Part already exists" }, {status: 409});
    } else {
      //reqBody could contain null values which will raise an error on create
      //Thus we get rid of null values
      const validData = Object.fromEntries(
        Object.entries(reqBody).filter(([key, value]) => value && value !== null)
      ) as Prisma.PartsUncheckedCreateInput;
      //As PartsUncheckedCreateInput needed, otherwise a TypeError will be raised
      console.log("Creating part...");
      const partCreate = await prisma.parts.create({
        data: validData,
      });
      


      if (partCreate) {
        console.log("Created part:")
        console.log(partCreate)
        return NextResponse.json({
          body: partCreate,
          message: "Part created",
        }, {status: 200});
      } else {
        return NextResponse.json({ error: "Part not created" }, {status: 500});
      }
    }
  } catch (error: ErrorCallback | any) {
    console.log("Error creating part", error);
    return NextResponse.json({ error: "Error creating part" }, {status: 500});
  }
}
