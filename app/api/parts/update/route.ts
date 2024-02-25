import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const res = await request.json();

    const partId = res.id;
    const newQuantity = res.quantity;

    const updatedPart = await prisma.parts.update({
      where: {
        id: partId,
      },
      data: {
        quantity: newQuantity,
      }
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
