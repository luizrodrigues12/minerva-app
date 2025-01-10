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
      className="checkbox flex justify-between items-center p-2.5 px-4 bg-background03 w-full rounded-lg tracking-widest text-[13.5px] text-zinc-800"
      id={id}
    >
      <p
        className={isChecked ? "text-[#606060] line-through" : "text-[#404040]"}
      >
        {text}
      </p>
      {isChecked ? (
        <CheckCircleSolid
          onClick={onClick}
          color="#d4d4d8"
          className="hover:cursor-pointer size-[27px] text-[#606060]"
        />
      ) : (
        <CheckCircle
          onClick={onClick}
          color={"#d4d4d8"}
          className="hover:cursor-pointer size-[27px] text-[#404040]"
        />
      )}
    </div>
  );
};

export default MateriaComp;
