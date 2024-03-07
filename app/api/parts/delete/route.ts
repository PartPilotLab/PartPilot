import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const res = await request.json();

    const partId = res.id;
    // const
    const deletedPart = await prisma.parts.delete({ where: { id: partId } });
    const itemCount = await prisma.parts.aggregate({ _count: true });
    const parentCatalogNamesRaw = await prisma.parts.groupBy({
      by: ["parentCatalogName"],
    });
    const parentCatalogNames = parentCatalogNamesRaw.map(
      (item: any) => item.parentCatalogName
    );
    if (deletedPart) {
      return NextResponse.json({
        status: 200,
        body: deletedPart,
        itemCount: itemCount._count,
        parentCatalogNames: parentCatalogNames,
        message: "Part deleted",
      });
    } else {
      return NextResponse.json({ status: 500, error: "Part not deleted" });
    }
  } catch (error: ErrorCallback | any) {
    return NextResponse.json({ status: 500, error: error });
  }
}
