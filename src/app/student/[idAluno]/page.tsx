import InfoAlunoComp from "@/components/student/InfoAlunoComp";
import SectionComp from "@/components/page_/SectionComp";
import { revalidatePath } from "next/cache";

const page = async ({ params }: { params: Promise<{ idAluno: string }> }) => {
  const parametros = await params;
  const idAluno = parametros.idAluno;
  return (
    <SectionComp>
      <InfoAlunoComp idAluno={idAluno} />
    </SectionComp>
  );
};

export default page;
