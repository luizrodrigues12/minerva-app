import SubjectsStudentForm from "@/components/parents/get_subjects/SubjectsStudentForm";

type Params = { token: string; idAluno: string };

const page = async ({ params }: { params: Promise<Params> }) => {
  const parametros = await params;
  const { idAluno, token } = parametros;
  return <SubjectsStudentForm idAluno={idAluno} />;
};

export default page;
