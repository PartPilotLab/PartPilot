import { PartState } from "@/lib/helper/part_state";
import DashboardPage from "./dashboardPage";
import prisma from "@/lib/prisma";



export default async function Home() {
  const parts = await prisma.parts.findMany() as PartState[];

  return <DashboardPage loadedParts={parts}/>;
}
