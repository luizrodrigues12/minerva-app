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
      className="checkbox flex justify-between items-center p-[9px] px-3 bg-background03 w-full rounded-lg tracking-widest text-[14px] md:text-[16px] text-zinc-800 md:py-2.5 md:px-4"
      id={id}
    >
      <p
        className={`${
          isChecked ? "text-[#606060] line-through" : "text-[#404040]"
        } leading-4`}
      >
        {text}
      </p>
      {isChecked ? (
        <CheckCircleSolid
          onClick={onClick}
          strokeWidth={1.5}
          color="#d4d4d8"
          className={`size-[24.3px] md:size-[27px] text-roxominerva ${
            isParentPage ? " " : "hover:cursor-pointer"
          }`}
        />
      ) : (
        <div
          className={`size-[19px] border-[1.5px] my-[2.67px] border-roxominerva rounded-[100%] mr-[2.5px] md:border-[2px] md:size-[21px] md:my-[3px] ${
            isParentPage ? " " : "cursor-pointer"
          }`}
          onClick={onClick}
        />
      )}
    </div>
  );
};

export default MateriaComp;
