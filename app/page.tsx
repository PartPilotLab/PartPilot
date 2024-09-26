export const dynamic = "force-dynamic";
import { PartState } from "@/lib/helper/part_state";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import DashboardPage from "./dashboardPage";

type Props = {
  searchParams?: {
    catalog?: string;
  };
};

export default async function Home(props: Props) {
  const session = await getServerSession(authOptions);
  const catalog = props.searchParams?.catalog;
  const userId = session?.user?.id || null;

  const whereCondition: Prisma.PartsWhereInput = {
    parentCatalogName: catalog ? { equals: catalog } : undefined,
    userId: userId,
  };

  const [parts, aggregatedParts, parentCatalogNamesRaw] = await Promise.all([
    prisma.parts.findMany({
      where: whereCondition,
      orderBy: { id: "desc" },
      take: 10,
    }),
    prisma.parts.aggregate({
      where: { userId: userId },
      _count: true,
    }),
    prisma.parts.groupBy({
      by: ["parentCatalogName"],
      where: { userId: userId },
    }),
  ]);

  const parentCatalogNames = parentCatalogNamesRaw
    .filter((item) => item.parentCatalogName !== null)
    .map((item) => item.parentCatalogName);

  return (
    <DashboardPage
      loadedParts={parts as unknown as PartState[]}
      itemCount={parts.length}
      parentCatalogNames={(parentCatalogNames as string[]) ?? []}
      searchCatalog={catalog}
    />
  );
}
