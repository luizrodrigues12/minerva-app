import { NextRequest, NextResponse, userAgent } from "next/server";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import UserModel from "@/models/userModel";

type BodyProps = {
  email: string;
  sendEmail?: boolean;
  verifyEmail?: boolean;
};

export async function PUT(req: NextRequest) {
  try {
    const {
      email,
      sendEmail = false,
      verifyEmail = false,
    }: BodyProps = await req.json();

    if (!email) throw new Error("Email inválido ou inexistente.");

    if (sendEmail) {
      const emailToken = jwt.sign({ email: email }, process.env.JWT_SECRET!, {
        expiresIn: "5min",
      });

      // NODEMAILER
      const transport = nodemailer.createTransport({
        host: process.env.MAILER_HOST,
        port: 587,
        secure: false,
        auth: {
          user: process.env.MAILER_USER,
          pass: process.env.MAILER_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

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
               }/profile/verify_email/${emailToken}`}">verificar email</a> para verificar seu email.
               </p>
             </div>`,
      });
      return NextResponse.json({ success: "Email enviado com sucesso." });
    }

    if (verifyEmail) {
      // Verificando se email existe
      const { email: emailDecoded }: any = jwt.decode(email);
      const emailExisting = await UserModel.findOne({ email: emailDecoded });
      if (!emailExisting) throw new Error("Email não cadastrado.");

      // Verificando se o email foi gerado pelo Minerva token.
      if (!jwt.verify(email, process.env.JWT_SECRET!))
        throw new Error("Esse link é inválido ou expirou.");

      //Verificando se o email já é verificado.
      const user = await UserModel.findOne({ email: emailDecoded });
      if (user.isVerified) throw new Error("Esse email já está verificado.");

      await UserModel.updateOne({ email: emailDecoded }, { isVerified: true });
      return NextResponse.json({ success: "Email verificado com sucesso." });
    }

    throw new Error("Envie sendEmail = true ou verifyEmail = true");
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
