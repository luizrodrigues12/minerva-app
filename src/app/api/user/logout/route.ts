import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("authorization");
    cookieStore.delete("username");

    return NextResponse.json({ sucess: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
