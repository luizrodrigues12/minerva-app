import { CheckCircle } from "flowbite-react-icons/outline";
import { CheckCircle as CheckCircleSolid } from "flowbite-react-icons/solid";

type Props = {
  text: string;
  isChecked: boolean;
  onClick?: any;
  id: string;
  isParentPage?: boolean;
};

const MateriaComp = ({
  text,
  onClick,
  isChecked,
  id,
  isParentPage = false,
}: Props) => {
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
          strokeWidth={1.5}
          color="#d4d4d8"
          className={`size-[27px] text-roxominerva ${
            isParentPage ? " " : "hover:cursor-pointer"
          }`}
        />
      ) : (
        <div
          className={`size-[21.5px] border-[1.5px] my-[2.75px] border-roxominerva rounded-full mr-0.5 ${
            isParentPage ? " " : "cursor-pointer"
          }`}
          onClick={onClick}
        />
      )}
    </div>
  );
};

export default MateriaComp;
