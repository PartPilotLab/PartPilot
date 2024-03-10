import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// For advanced search: fetch all distinct values for each column
// Then have a selector allowing to choose from those values
function convertOperation(operation: string) {
  switch (operation) {
    case ">":
      return "gt";
    case ">=":
      return "gte";
    case "=":
      return "equals";
    case "<":
      return "lt";
    case "<=":
      return "lte";
    default:
      throw new Error(`Invalid operation: ${operation}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    const res = await request.json();
    console.log(res);
    const filter = res.filter;
    console.log(filter);
    const page = res.page;

    let where: Prisma.PartsWhereInput = {
      productCode: {
        contains: filter.productCode,
      },
      title: {
        contains: filter.productTitle,
      },
      productDescription: {
        contains: filter.productDescription,
      },
      parentCatalogName: {
        // contains: filter.parentCatalogName,
        equals: filter.parentCatalogName,
      }
    };

    // Add conditions based on the filter object
    for (const key in filter) {
      if (
        filter[key].value !== undefined &&
        filter[key].operation !== undefined
      ) {
        let operation = convertOperation(filter[key].operation);
        let temp: Prisma.PartsWhereInput = {};
        if (filter[key].value) {
          (temp as any)[key] = {
            [operation]: filter[key].value,
          };
        }
        where = { ...where, ...temp };
      }
    }

    const parts = await prisma.parts.findMany({
      where,
      orderBy: { id: "desc" },
      take: 10,
      skip: page ? (page - 1) * 10 : 0,
    });
    return NextResponse.json({ status: 200, parts: parts });
  } catch (error: ErrorCallback | any) {
    return NextResponse.json({ status: 500, error: error });
  }
}
