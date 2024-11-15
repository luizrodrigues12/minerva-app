import { Book } from "flowbite-react-icons/outline";

const AlunosComp = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return (
    <div className="container_alunos">
      <div className=" flex p-2 pb-1.5 px-3 rounded-lg border-2 border-roxominerva shadow-lg justify-between items-center">
        <p className="font-medium text-[17px] tracking-wide text-zinc-300 ">
          {text}
        </p>
        <div className="options flex gap-3">
          <Book color="#FAA139" onClick={onClick} />
          {/* #4F47A8 */}
        </div>
      </div>
    </div>
  );
};

export default AlunosComp;
