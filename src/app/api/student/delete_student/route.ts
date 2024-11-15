import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { idAluno, token } = await reqBody;

    await UserModel.updateOne(
      { token: token },
      { $pull: { alunos: { idAluno: idAluno } } }
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
