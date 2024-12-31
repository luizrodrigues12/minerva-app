import Link from "next/link";

const InfoAlunoButtons = ({ idAluno }: { idAluno: string }) => {
  return (
    <div className="w-full flex gap-2">
      <Link
        prefetch
        href={`/student/update_student/${idAluno}`}
        className="flex items-center justify-center rounded-lg text-[13px] font-medium p-1.5 w-full md:p-[7px] text-zinc-300 bg-[#4f47a8cc] tracking-wider"
      >
        EDITAR
      </Link>
      <Link
        prefetch
        href={`/student/delete_student/${idAluno}`}
        className="flex items-center justify-center rounded-lg text-[13px] font-medium p-1.5 w-full md:p-[7px] text-zinc-300 bg-[#961f17cc] tracking-wider"
      >
        <div>APAGAR</div>
      </Link>
    </div>
  );
};

export default InfoAlunoButtons;
