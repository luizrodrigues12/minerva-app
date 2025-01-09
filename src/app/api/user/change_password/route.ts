import UserModel, { dataMongoUser } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

type BodyType = {
  token: string;
  currentPassword: string;
  newPassword: string;
};

export async function POST(req: NextRequest) {
  try {
    const { token, currentPassword, newPassword }: BodyType = await req.json();

    if (!token || !currentPassword || !newPassword)
      throw new Error("Envie token, currentPassword e newPassword!");

    // Verificando se a senha atual é correta
    const user = await UserModel.findOne<dataMongoUser>({ token });

    const verifyCurrentPassword = await bcrypt
      .compare(currentPassword, user?.password!)
      .catch((err) => console.log(err.message));
    // Verificando se a senha é a mesma
    const isTheSamePass = await bcrypt.compare(newPassword, user?.password!);
    if (isTheSamePass) throw new Error("A nova senha não pode ser a atual.");

    const newPasswordCrypt = await bcrypt.hash(newPassword, 10);
    if (verifyCurrentPassword) {
      await UserModel.updateOne({ token }, { password: newPasswordCrypt });
    } else {
      throw new Error("A senha atual está incorreta.");
    }

    return NextResponse.json({ succes: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
