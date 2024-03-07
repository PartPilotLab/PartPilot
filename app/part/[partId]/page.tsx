export const dynamic = 'force-dynamic';
import { PartState } from "@/lib/helper/part_state";
import PartPage from "./partPage";
import prisma from "@/lib/prisma";

export default async function Part({params}: {params: {partId: string}}) {
  const partInfo = await prisma.parts.findUnique({where: {id: parseInt(params.partId)}}) as PartState;
  return <PartPage part={partInfo}/>;
}
