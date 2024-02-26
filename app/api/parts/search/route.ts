import { NextRequest, NextResponse } from "next/server";

// Important search values:
// ProductCode
// ParentCatalogName
// EncapStandard
// Voltage
// Current
// Resistance
// Tolerance
// Power
// Frequency
// Capacitance

// export async function GET(request: NextRequest) {
//   try {
//     console.log("GETTING PARTS");

//     const { searchParams } = new URL(request.url);
//     const page = searchParams.get("page");
//     const parts = await prisma.parts.findMany({
//       orderBy: { id: "desc" },
//       take: 1,
//       skip: page ? (parseInt(page) - 1) * 10 : 0,
//     });
//     return NextResponse.json({ status: 200, parts: parts });
//   } catch (error: ErrorCallback | any) {
//     return NextResponse.json({ status: 500, error: error });
//   }
// }
function handleWhereClause() {}
// For advanced search: fetch all distinct values for each column
// Then have a selector allowing to choose from those values

export async function POST(request: NextRequest) {
  try {
    const res = await request.json();
    console.log(res)
    const filter = res.filter;
    console.log(filter);
    const page = res.page;

    const productCode = filter.productCode;

    const parts = await prisma.parts.findMany({
      where: {
        productCode: {
          contains: productCode,
        },
      },
      orderBy: { id: "desc" },
      take: 10,
      skip: page ? (page - 1) * 10 : 0,
    });
    return NextResponse.json({ status: 200, parts: parts });
  } catch (error: ErrorCallback | any) {
    return NextResponse.json({ status: 500, error: error });
  }
}