import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

type bodyReq = {
  idAluno: string;
  nome: string;
  preparatorio: Array<string>;
  token: string;
};

export async function POST(req: NextRequest) {
  try {
    // Pegando body da requisição
    const bodyReq = await req.json();
    const { idAluno, nome, preparatorio, token } = bodyReq;
    console.log(preparatorio);
    // Identificando usuário
    const user = await UserModel.findOne({ token: token });
    // Adicionando aluno
    await UserModel.updateOne(
      { token: token },
      {
        alunos: [
          ...user.alunos,
          {
            idAluno: idAluno,
            nome: nome,
            preparatorio: preparatorio,
          },
        ],
      }
    );
    user.save();

    return NextResponse.json({ sucess: "aluno adicionado!" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
