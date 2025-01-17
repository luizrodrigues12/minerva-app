import UserModel, { dataMongoUser } from "@/models/userModel";
import { validateEmail } from "@/utils/regex";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

type BodyProps = {
  email: string;
  token: string;
  sendEmail?: boolean;
  changeEmail?: boolean;
};

export async function PUT(req: NextRequest) {
  try {
    const {
      email,
      token,
      sendEmail = false,
      changeEmail = false,
    }: BodyProps = await req.json();

    if (!email || !validateEmail.test(email))
      throw new Error("Email inválido ou inexistente.");
    if (!token || !jwt.verify(token, process.env.JWT_SECRET!))
      throw new Error("Token inválido ou inexistente!");

    //Verificando se email já está em uso
    const emailExisting = await UserModel.findOne({ email });
    if (emailExisting) throw new Error(`Esse email já está sendo usado.`);

    if (changeEmail) {
      await UserModel.updateOne({ token }, { email: email });
      return NextResponse.json({ success: "Email alterado com sucesso!" });
    }

    if (sendEmail) {
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
        subject: "Altere seu email - MINERVA",
        from: `Minerva <${process.env.MAILER_USER}>`,
        to: email,
        html: `
           <div style="width: 250px; color: black;">
             <h3 style="font-size: 18px;">Altere seu email:</h3>
             <p style="font-size: 16px;">
             Clique <a style="text-decoration: none; color: #4f47a8" href="${`${
               process.env.HOST as string
             }/profile/change_email/${email}`}">aqui</a> para alterar seu email.
             </p>
           </div>`,
      });

      return NextResponse.json({ success: "Email enviado com sucesso." });
    }

    throw new Error("Envie sendEmail = true ou ChangeEmail = true");
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
