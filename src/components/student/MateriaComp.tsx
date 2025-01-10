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
          color="#d4d4d8"
          className={`size-[27px] text-roxominerva ${
            isParentPage ? " " : "hover:cursor-pointer"
          }`}
        />
      ) : (
        <CheckCircle
          onClick={onClick}
          color={"#d4d4d8"}
          className={` size-[27px] text-corIcones ${
            isParentPage ? " " : "hover:cursor-pointer"
          }`}
        />
      )}
    </div>
  );
};

export default MateriaComp;
