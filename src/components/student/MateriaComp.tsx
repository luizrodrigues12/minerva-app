import { CheckCircle } from "flowbite-react-icons/outline";
import { CheckCircle as CheckCircleSolid } from "flowbite-react-icons/solid";

type Props = {
  text: string;
  isChecked: boolean;
  onClick?: any;
  id: string;
};

const MateriaComp = ({ text, onClick, isChecked, id }: Props) => {
  return (
    <div
      className="checkbox flex justify-between items-center p-3 px-4 bg-zinc-950 w-full rounded-lg font-medium text-zinc-200 tracking-widest text-[13.5px] my-[4px] shadow-md"
      id={id}
    >
      <p className={isChecked ? "checked" : "text-zinc-300"}>{text}</p>
      {isChecked ? (
        <CheckCircleSolid
          onClick={onClick}
          color="#d4d4d8"
          className="hover:cursor-pointer"
        />
      ) : (
        <CheckCircle
          onClick={onClick}
          color={"#d4d4d8"}
          className="hover:cursor-pointer"
        />
      )}
    </div>
  );
};

export default MateriaComp;
