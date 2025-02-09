import UserModel, {
  dataMongoUser,
  daysAndSubjectsType,
  PlanningObj,
} from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

interface bodyProps {
  daysAndSubjects: Array<daysAndSubjectsType>;
  subjectPerDay: number;
  idAluno: string;
}

export async function POST(req: NextRequest) {
  try {
    const { daysAndSubjects, subjectPerDay, idAluno }: bodyProps =
      await req.json();

    if (!daysAndSubjects) throw new Error("dias e matérias não enviados.");
    if (!subjectPerDay)
      throw new Error("Variável 'matérias por dia' não enviada.");
    if (!idAluno) throw new Error("idAluno não enviado.");

    const planning: PlanningObj = {
      daysAndSubjects,
      subjectPerDay,
      year: new Date().getFullYear(),
    };

    const user = await UserModel.findOneAndUpdate<dataMongoUser>(
      { "alunos.idAluno": idAluno },
      { $set: { "alunos.$[a].planning": planning } },
      { arrayFilters: [{ "a.idAluno": idAluno }] }
    );

    return NextResponse.json({ user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
