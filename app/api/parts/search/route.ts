import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

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
  // Get user session
  const session = await getServerSession(authOptions);

  try {
    const res = await request.json();
    const filter = res.filter;
    const page = res.page;

    let where: Prisma.PartsWhereInput = {
      userId: session.user.id,
    };

    if (filter.productCode) {
      where.productCode = {
        contains: filter.productCode,
      };
    }

    if (filter.productTitle) {
      where.title = {
        contains: filter.productTitle,
      };
    }

    if (filter.productDescription) {
      where.productDescription = {
        contains: filter.productDescription,
      };
    }

    if (filter.parentCatalogName) {
      where.parentCatalogName = {
        equals: filter.parentCatalogName,
      };
    }
    if (filter.encapStandard) {
      where.encapStandard = {
        contains: filter.encapStandard,
      };
    }

    // Add conditions based on the filter object
    for (const key in filter) {
      if (
        key === "productCode" ||
        key === "productTitle" ||
        key === "productDescription" ||
        key === "parentCatalogName" ||
        key === "encapStandard"
      ) {
        continue; // Skip these keys, they are already handled above
      }
      if (
        filter[key] !== null &&
        filter[key].value !== null &&
        filter[key].operation !== null
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
    console.log(error);
    return NextResponse.json({ status: 500, error: error });
  }
}
