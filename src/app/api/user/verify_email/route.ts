import { validateEmail } from "@/utils/regex";
import { NextRequest, NextResponse, userAgent } from "next/server";
import jwt from "jsonwebtoken";
import { transport } from "../forget_password/route";
import UserModel from "@/models/userModel";

type BodyProps = {
  email: string;
  token: string;
  sendEmail?: boolean;
  verifyEmail?: boolean;
};

export async function PUT(req: NextRequest) {
  try {
    const {
      email,
      token,
      sendEmail = false,
      verifyEmail = false,
    }: BodyProps = await req.json();

    if (!email || !validateEmail.test(email))
      throw new Error("Email inválido ou inexistente.");
    if (!token || !jwt.verify(token, process.env.JWT_SECRET!))
      throw new Error("Token inválido ou inexistente.");

    const emailExisting = await UserModel.findOne({ email });
    if (!emailExisting) throw new Error("Email não cadastrado.");

    if (sendEmail) {
      const data = await transport.sendMail({
        subject: "Verifique seu email - MINERVA",
        from: `Minerva <${process.env.MAILER_USER}>`,
        to: email,
        html: `
             <div style="width: 250px; color: black;">
               <h3 style="font-size: 18px;">Verifique seu email:</h3>
               <p style="font-size: 16px;">
               Clique em <a style="text-decoration: none; color: #4f47a8" href="${`${
                 process.env.HOST as string
               }/profile/verify_email/${email}`}">verificar email</a> para verificar seu email.
               </p>
             </div>`,
      });
      return NextResponse.json({ success: "Email enviado com sucesso." });
    }

    if (verifyEmail) {
      const user = await UserModel.findOne({ email });
      if (user.isVerified) throw new Error("Esse email já está verificado.");
      await UserModel.updateOne({ token }, { isVerified: true });
      return NextResponse.json({ success: "Email verificado com sucesso." });
    }

    throw new Error("Envie sendEmail = true ou verifyEmail = true");
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
