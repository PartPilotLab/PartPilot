import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const res = await request.json();

    const partId = res.id;
    // const 
    const deletedPart = await prisma.parts.delete({where: {id: partId}});
    const itemCount = await prisma.parts.aggregate({_count: true}); 
    if(deletedPart){
      return NextResponse.json({ status: 200, body: deletedPart, itemCount: itemCount._count, message: "Part deleted"});
    }
    else {
      return NextResponse.json({ status: 500, error: "Part not deleted" });
    }
} catch (error: ErrorCallback | any) {
    return NextResponse.json({ status: 500, error: error });
  }
}