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
      className="checkbox flex justify-between items-center p-3 px-4 bg-[#00000070] w-full rounded-lg text-zinc-200 tracking-widest text-[13.5px] shadow-md"
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
