import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const bodyReq = await req.json();
    const { token, idAluno, nomeAluno, checks } = await bodyReq;

    if (nomeAluno)
      await UserModel.updateOne(
        { token: token },
        { $set: { "alunos.$[a].nome": nomeAluno } },
        { arrayFilters: [{ "a.idAluno": idAluno }] }
      );

    if (checks.length > 0)
      await UserModel.updateOne(
        { token: token },
        { $set: { "alunos.$[a].preparatorio": checks } },
        { arrayFilters: [{ "a.idAluno": idAluno }] }
      );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
