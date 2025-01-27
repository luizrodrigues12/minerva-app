import UserModel, { dataMongoUser } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { idAluno } = reqBody;
    const user = await UserModel.findOne<dataMongoUser>({
      "alunos.idAluno": idAluno,
    });
    const dataUser = { name: user?.name, avatar: user?.avatar };
    const alunoExato = user?.alunos?.filter(
      (aluno: any) => aluno.idAluno === idAluno
    );

    if (!alunoExato) throw new Error("Esse aluno não existe.");

    return NextResponse.json({ aluno: alunoExato[0], user: dataUser });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
