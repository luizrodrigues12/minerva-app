import UserModel, { dataMongoUser } from "@/models/userModel";
import { validateEmail } from "@/utils/regex";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

type BodyProps = {
  newEmail: string;
  oldEmail: string;
  emailTokenReceived: string;
  sendEmail?: boolean;
  changeEmail?: boolean;
};

const testEmails = (newEmail: string, oldEmail: string) => {
  if (!validateEmail.test(newEmail)) throw new Error("Email novo inválido.");
  if (!validateEmail.test(oldEmail)) throw new Error("Email atual inválido.");
};

export async function PUT(req: NextRequest) {
  try {
    const {
      newEmail,
      oldEmail,
      emailTokenReceived,
      sendEmail = false,
      changeEmail = false,
    }: BodyProps = await req.json();

    if (changeEmail) {
      if (!jwt.verify(emailTokenReceived, process.env.JWT_SECRET!))
        throw new Error("Token inválido.");

      const { newEmail, oldEmail }: any = jwt.decode(emailTokenReceived);
      if (!newEmail || !oldEmail)
        throw new Error("newEmail ou oldEmail faltando.");

      testEmails(newEmail, oldEmail);

      //Verificando se email já está em uso
      const emailExisting = await UserModel.findOne({ email: newEmail });
      if (emailExisting) throw new Error(`Esse email já está sendo usado.`);

      await UserModel.updateOne({ email: oldEmail }, { email: newEmail });
      return NextResponse.json({ success: "Email alterado com sucesso!" });
    }

    if (sendEmail) {
      if (!newEmail || !oldEmail)
        throw new Error("Email atual ou novo email faltando.");

      testEmails(newEmail, oldEmail);

      const emailTokenSent = jwt.sign(
        { newEmail, oldEmail },
        process.env.JWT_SECRET!,
        { expiresIn: "5min" }
      );

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
        to: newEmail,
        html: `
           <div style="width: 250px; color: black;">
             <h3 style="font-size: 18px;">Altere seu email:</h3>
             <p style="font-size: 16px;">
             Clique <a style="text-decoration: none; color: #4f47a8" href="${`${
               process.env.HOST as string
             }/profile/change_email/${emailTokenSent}`}">aqui</a> para alterar seu email.
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
