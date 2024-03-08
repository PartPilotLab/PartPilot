export const dynamic = "force-dynamic";
import { PartState } from "@/lib/helper/part_state";
import CategoriesPage from "./categoriesPage";

export default async function Categories() {
  const catalogItems = await prisma.parts.groupBy({
    by: ["parentCatalogName", "productImages"],
    
     
  });
  console.log(catalogItems)
//   const parentCatalogNames = parentCatalogNamesRaw.map(
//     (item) => item.parentCatalogName
//   );

  return (
    <CategoriesPage
    catalogItems={catalogItems as PartState[] ?? []}
    />
  );
}
