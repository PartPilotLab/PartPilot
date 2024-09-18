export const dynamic = "force-dynamic";
import { PartState } from "@/lib/helper/part_state";
import prisma from "@/lib/prisma";
import { Container, Text } from "@mantine/core";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/route";
import DashboardPage from "./dashboardPage";

type Props = {
  searchParams?: {
    catalog?: string;
  };
};

export default async function Home(props: Props) {
  const session = await getServerSession(authOptions);

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
  const catalog = props.searchParams?.catalog;
  //Get first 10 items
  const parts = await prisma.parts.findMany({
    where: {
      parentCatalogName: catalog ? { equals: catalog } : undefined,
      userId: session.user.id, // Always filter by the current user's ID
    },
    orderBy: { id: "desc" },
    take: 10,
  });
  //Get total part count and parent catalog names
  const aggregatedParts = await prisma.parts.aggregate({
    where: { userId: session.user.id },
    _count: true,
  });
  const parentCatalogNamesRaw = await prisma.parts.groupBy({
    by: ["parentCatalogName"],
    where: { userId: session.user.id },
  });
  //Filter parent catalog names (exclude null values)
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
