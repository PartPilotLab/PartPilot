import { NextResponse } from "next/server";

export async function GET() {
  const providers = ["LCSC"];
  
  if (process.env.MOUSER_API_KEY) {
    providers.push("Mouser");
  }

  return NextResponse.json(providers);
}
