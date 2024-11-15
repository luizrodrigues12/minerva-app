import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const bodyReq = await req.json();
    const { token } = await bodyReq;
    const user = await UserModel.findOne({ token });
    const alunos = user.alunos;

    // Apagando alunos que não tem matérias
    await alunos
      .filter((aluno: any) => aluno.materias.length === 0)
      .map(async (aluno: any) => {
        await UserModel.updateOne(
          { token: token },
          { $pull: { alunos: { idAluno: aluno.idAluno } } }
        );
      });

    return NextResponse.json({ alunos });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
