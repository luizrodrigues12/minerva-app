import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { idAluno } = reqBody;
    const user = await UserModel.findOne({ "alunos.idAluno": idAluno });
    const alunoExato = user.alunos.filter(
      (aluno: any) => aluno.idAluno === idAluno
    );

    return NextResponse.json({ aluno: alunoExato[0] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
