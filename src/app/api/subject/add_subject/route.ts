import MateriasModel from "@/models/MateriasModel";
import { NextRequest, NextResponse } from "next/server";

type BodyType = { nome: string; materia: string; ordem: string };

export async function POST(req: NextRequest) {
  try {
    // Pegando body enviado
    const bodyReq = await req.json();
    const { nome, materia, ordem }: BodyType = bodyReq;
    // Verificando se a ordem já existe na matéria
    const haveMateria = await MateriasModel.findOne({
      ordem: ordem,
      materia: materia,
    });
    console.log(haveMateria);
    if (haveMateria && haveMateria.ordem === ordem)
      throw new Error("Essa ordem já existe nessa matéria");

    // Criando matéria
    const newSubject = await MateriasModel.create({
      nome: nome,
      ordem: ordem,
      materia: materia,
    });

    return NextResponse.json({ newSubject });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
