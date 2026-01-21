import { extractPartInfoFromLCSCResponse } from "@/lib/helper/lcsc_api";
import { searchMouser } from "@/lib/helper/mouser_api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const res = await request.json();
    console.log(res);

    const pcNumber = res.productCode;
    const provider = res.provider || "LCSC"; // Default to LCSC
    console.log(`Searching for ${pcNumber} using ${provider}`);

    if (provider === "Mouser") {
       const partInfo = await searchMouser(pcNumber);
       if (!partInfo) {
         return NextResponse.json({ status: 404, error: "Part not found" });
       }
       return NextResponse.json({ status: 200, body: partInfo });
    }

    // Default LCSC fallback
    const LSCSPart = await fetch(
      "https://wmsc.lcsc.com/ftps/wm/product/detail?productCode=" + pcNumber
    )
      .then((response) => {
        return response.json();
      })
      .catch((e: ErrorCallback | any) => {
        console.error(e.message);
      });
    console.log(LSCSPart);
    const partInfo = extractPartInfoFromLCSCResponse(LSCSPart);
    return NextResponse.json({ status: 200, body: partInfo });
  } catch (error: ErrorCallback | any) {
    console.log(error);
    return NextResponse.json({ status: 500, error: error });
  }
}
