import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

//Manually create a part

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const reqBody = await request.json();
    const userId = session?.user?.id || null;
    const pcNumber = reqBody.productCode;

    const existingPart = await prisma.parts.findFirst({
      where: {
        productCode: pcNumber,
        userId: userId,
      },
    });

    if (existingPart) {
      return NextResponse.json(
        { error: "Part already exists" },
        { status: 409 }
      );
    }

    const validData = Object.fromEntries(
      Object.entries(reqBody).filter(([_, value]) => value !== null)
    ) as Prisma.PartsUncheckedCreateInput;

    const dataWithUserId = { ...validData, userId };

    const partCreate = await prisma.parts.create({
      data: dataWithUserId,
    });

    if (partCreate) {
      return NextResponse.json(
        {
          body: partCreate,
          message: "Part created",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ error: "Part not created" }, { status: 500 });
    }
  } catch (error: ErrorCallback | any) {
    console.log("Error creating part", error);
    return NextResponse.json({ error: "Error creating part" }, { status: 500 });
  }
}
