import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import UserModel, { dataMongoUser } from "@/models/userModel";
import { utapi } from "@/utils/uploadthing";

export async function PUT(req: NextRequest) {
  try {
    const Form = await req.formData();

    const image = Form.get("image")!;
    const token = Form.get("token")!;
    const user = await UserModel.findOne<dataMongoUser>({ token });
    const hasAvatar = user?.avatar;

    if (!token || !jwt.verify(token as string, process.env.JWT_SECRET!))
      throw new Error("Token inválido ou inexistente.");
    if (!image) throw new Error("Envie uma imagem.");

    if (hasAvatar) {
      await utapi.deleteFiles(user.avatar_key);
      const res = await utapi.uploadFiles(image as File);
      const { data } = res;

      await UserModel.findOneAndUpdate(
        { token },
        { $set: { avatar: data?.url } }
      );
      const userData = await UserModel.findOneAndUpdate(
        { token },
        { $set: { avatar_key: data?.key } }
      );

      return NextResponse.json({ user: userData });
    }

    if (!hasAvatar) {
      const res = await utapi.uploadFiles(image as File);
      const { data } = res;

      await UserModel.findOneAndUpdate(
        { token },
        { $set: { avatar: data?.url } }
      );
      const userData = await UserModel.findOneAndUpdate(
        { token },
        { $set: { avatar_key: data?.key } }
      );
      return NextResponse.json({ user: userData });
    }
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { token }: { token: string } = await req.json();
    if (!token || !jwt.verify(token, process.env.JWT_SECRET!))
      throw new Error("Token inexistente ou inválido.");

    const res = await UserModel.findOne<dataMongoUser>({ token });
    if (!res?.avatar_key || !res?.avatar) throw new Error("Você não tem foto.");
    await utapi.deleteFiles(res?.avatar_key!);

    await UserModel.findOneAndUpdate({ token }, { avatar: null });
    const userData = await UserModel.findOneAndUpdate(
      { token },
      { avatar_key: null }
    );

    const data = userData[0];

    return NextResponse.json({ user: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
