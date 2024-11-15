import Link from "next/link";

const PesquisaComp = () => {
  return (
    <div className="flex gap-2 justify-center">
      <input
        type="text"
        id="buscar"
        className="input_email_username border-[1px] w-[195px]"
        placeholder="Pesquisar"
      />
      <Link
        href={`${process.env.NEXT_PUBLIC_HOST}/add_student`}
        className=" bg-roxominerva flex items-center rounded-md p-[15px] h-10 text-zinc-100"
      >
        Adicionar
      </Link>
    </div>
  );
};

export default PesquisaComp;
