import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { dataMongoUser } from "@/models/userModel";

export async function POST(req: NextRequest) {
  try {
    const bodyReq = await req.json();
    const { token, idAluno }: { token: string; idAluno: string } =
      await bodyReq;
    // Pegando user do DB
    const user = await UserModel.findOne<dataMongoUser>({ token: token });
    const alunos = user?.alunos;
    const aluno = alunos?.filter((aluno) => {
      return aluno.idAluno === idAluno;
    });

    return NextResponse.json({ aluno }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
