import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/dbConfig/dbConfig";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(req: NextRequest) {
  try {
    // Pegando body
    const { email } = await req.json();
    // Pegando ID e EMAIL do DB
    const { _id, email: emailUser } = await UserModel.findOne({ email: email });
    if (!emailUser) throw new Error("Conta não existente.");

    const idUser = _id.toString();
    const idToken = jwt.sign({ _id: idUser }, process.env.JWT_SECRET!, {
      expiresIn: "5min",
    });

    console.log(emailUser);

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
      text: "",
      subject: "Redefina Sua Senha - MINERVA",
      from: `Minerva <${process.env.MAILER_USER}>`,
      to: emailUser,
      html: `
      <div style="width: 250px; color: black;">
        <h3>Redefina sua senha:</h3>
        <p style="font-size: 14px;">
        Clique <a style="text-decoration: none; color: #4f47a8" href="${`${
          process.env.HOST as string
        }/reset_password/${idToken}`}">aqui</a> para redefinir sua senha.
        </p>
      </div>`,
    });

    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
