import { PartState } from "@/lib/helper/part_state";
import DashboardPage from "./dashboardPage";
import prisma from "@/lib/prisma";



export default async function Home() {
  //@ts-ignore
  const parts = await prisma.parts.findMany({orderBy: {id: 'desc'}, take: 10}) as PartState[];
  const aggregatedParts = await prisma.parts.aggregate({_count: true})
  console.log(aggregatedParts._count)

  return <DashboardPage loadedParts={parts} itemCount={aggregatedParts._count}/>;
}
