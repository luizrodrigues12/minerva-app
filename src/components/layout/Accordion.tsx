import { MateriaType } from "@/models/MateriasModel";
import { AngleDown, AngleUp } from "flowbite-react-icons/outline";
import { motion } from "motion/react";
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
      className={`w-full bg-[#00000030] rounded-lg tracking-wide ${className}`}
    >
      <div className="flex justify-between py-3">
        <div className="text-textwhite text-[16px] flex w-full px-3">
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

      <div
        id="component-accordion"
        className={`${
          isOpen ? "flex" : "hidden"
        } border-[#00000030]  ${classNameContent}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
