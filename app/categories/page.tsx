export const dynamic = "force-dynamic";
import { PartState } from "@/lib/helper/part_state";
import CategoriesPage from "./categoriesPage";
import prisma from "@/lib/prisma";

export default async function Categories() {
  const catalogItems = await prisma.parts.findMany({
    distinct: ['parentCatalogName'],
    select: {
      parentCatalogName: true,
      productImages: true,
    },
  });

	return <CategoriesPage catalogItems={(catalogItems as PartState[]) ?? []} />;
}
