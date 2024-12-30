import { MateriaType } from "@/models/MateriasModel";
import { AngleDown, AngleUp } from "flowbite-react-icons/outline";
import CheckComp from "../add_student/CheckComp";
import { ReactNode, useState } from "react";

interface Props {
  textLeft: string;
  textRight: string;
  children: ReactNode;
  className?: string;
  classNameContent?: string;
}

const Accordion = ({
  textLeft,
  textRight,
  children,
  className,
  classNameContent,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`w-full border-2 py-3 border-zinc-800 rounded-lg font-medium ${className}`}
    >
      <div className="flex justify-between">
        <div className="text-zinc-200 text-[16px] flex w-full px-3">
          <p
            className="pr-2 cursor-pointer "
            onClick={() => setIsOpen(!isOpen)}
          >
            {textLeft.split("")[0].toUpperCase() + textLeft.slice(1)}
          </p>
          <p>-</p>
          <p className="pl-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            {textRight}
          </p>
        </div>
        {isOpen ? (
          <AngleUp
            className="mx-2 flex justify-center items-center mr-3 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
        ) : (
          <AngleDown
            className="mx-2 flex justify-center items-center mr-3 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
        )}
      </div>

      <hr
        id="horizontal-line"
        className={`border-0 bg-zinc-800 p-[1px] mt-3.5 ${
          isOpen ? "block" : "hidden"
        }`}
      />

      <div
        id="component-accordion"
        className={`${isOpen ? "flex" : "hidden"} ${classNameContent}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
