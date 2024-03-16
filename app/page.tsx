export const dynamic = "force-dynamic";
import { PartState } from "@/lib/helper/part_state";
import DashboardPage from "./dashboardPage";
import prisma from "@/lib/prisma";

type Props = {
  searchParams?: {
    catalog?: string;
  };
};

export default async function Home(props: Props) {
  //Get catalog search parameter from URL 
  const catalog = props.searchParams.catalog;
  //Get first 10 items 
  const parts = (await prisma.parts.findMany({
    orderBy: { id: "desc" },
    take: 10,
    where: { parentCatalogName: { equals: catalog } },
  })) as PartState[];
  //Get total part count and parent catalog names
  const aggregatedParts = await prisma.parts.aggregate({ _count: true });
  const parentCatalogNamesRaw = await prisma.parts.groupBy({
    by: ["parentCatalogName"],
  });
  //Filter parent catalog names (exclude null values)
  const parentCatalogNames = parentCatalogNamesRaw
    .filter((item) => item.parentCatalogName !== null)
    .map((item) => item.parentCatalogName);

  return (
    <DashboardPage
      loadedParts={parts}
      itemCount={aggregatedParts._count}
      parentCatalogNames={(parentCatalogNames as string[]) ?? []}
      searchCatalog={catalog}
    />
  );
}
