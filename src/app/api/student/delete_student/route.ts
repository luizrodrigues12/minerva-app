import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { idAluno, token } = await reqBody;

    const user = await UserModel.findOneAndUpdate(
      { token: token },
      { $pull: { alunos: { idAluno: idAluno } } }
    );

    return NextResponse.json({ user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
