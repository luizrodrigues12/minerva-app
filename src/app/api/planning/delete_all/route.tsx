import UserModel, { dataMongoUser } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { idAluno } = await req.json();

    if (!idAluno) throw new Error("IdAluno não enviado.");

    const user = await UserModel.findOneAndUpdate<dataMongoUser>(
      { "alunos.idAluno": idAluno },
      { "alunos.$[a].planning": [] },
      { arrayFilters: [{ "a.idAluno": idAluno }] }
    );

    return NextResponse.json({ user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
