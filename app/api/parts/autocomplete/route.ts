import { extractPartInfoFromLCSCResponse } from "@/lib/helper/lcsc_api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const res = await request.json();
    console.log(res);

    const pcNumber = res.productCode;
    console.log(pcNumber);

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
