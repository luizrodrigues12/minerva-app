import MateriasModel from "@/models/MateriasModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const materias = await MateriasModel.find();
    return NextResponse.json({ materias });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
