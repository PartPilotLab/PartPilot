export const dynamic = "force-dynamic";
import { PartState } from "@/lib/helper/part_state";
import prisma from "@/lib/prisma";
import { Container, Text } from "@mantine/core";
import { getServerSession } from "next-auth";
import Link from "next/link";
import DashboardPage from "./dashboardPage";

type Props = {
  searchParams?: {
    catalog?: string;
  };
};

export default async function Home(props: Props) {
  const session = await getServerSession();

  if (!session || !session.user) {
    return (
      <Container
        size="xs"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "24vh",
        }}
      >
        <Text c="dimmed" ta="center" size="lg">
          Please{" "}
          <Link href={"/login"} style={{ color: "#6c757d" }}>
            log in
          </Link>{" "}
          or{" "}
          <Link href={"/signup"} style={{ color: "#6c757d" }}>
            sign in
          </Link>{" "}
          to view your parts.
        </Text>
      </Container>
    );
  }

  //Get catalog search parameter from URL
  const catalog = props.searchParams.catalog;
  //Get first 10 items
  const parts = await prisma.parts.findMany({
    orderBy: { id: "desc" },
    take: 10,
    where: { parentCatalogName: { equals: catalog }, userId: session.user.id },
  });
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
      loadedParts={parts as PartState[]}
      itemCount={parts.length}
      parentCatalogNames={(parentCatalogNames as string[]) ?? []}
      searchCatalog={catalog}
    />
  );
}
