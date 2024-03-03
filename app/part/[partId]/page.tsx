import { PartState } from "@/lib/helper/part_state";
import PartPage from "./partPage";

export default async function Part({params}: {params: {partId: string}}) {
  const partInfo = await prisma.parts.findUnique({where: {id: parseInt(params.partId)}}) as PartState;
  return <PartPage part={partInfo}/>;
}
