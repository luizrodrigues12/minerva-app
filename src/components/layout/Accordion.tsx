import { MateriaType } from "@/models/MateriasModel";
import { AngleDown, AngleUp } from "flowbite-react-icons/outline";
import { motion } from "motion/react";
import { ReactNode, useState } from "react";

interface Props {
  textLeft: string;
  textRight?: string;
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
      className={`w-full bg-background03 rounded-md tracking-wide ${className}`}
    >
      <div
        className="flex justify-between py-2.5 md:py-3 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-textColor text-[14px] md:text-[16px] flex w-full px-3 items-center">
          <p className="pr-2" onClick={() => setIsOpen(!isOpen)}>
            {textLeft.split("")[0].toUpperCase() + textLeft.slice(1)}
          </p>
          {textRight && (
            <div className="flex">
              <p>-</p>
              <p className="pl-2" onClick={() => setIsOpen(!isOpen)}>
                {textRight}
              </p>
            </div>
          )}
        </div>
        {isOpen ? (
          <AngleUp className="mx-2 flex justify-center items-center mr-3 cursor-pointer text-corIcones hover:text-buttonHover" />
        ) : (
          <AngleDown className="mx-2 flex justify-center items-center mr-3 cursor-pointer text-corIcones hover:text-buttonHover" />
        )}
      </div>

      <div
        id="component-accordion"
        className={`${
          isOpen ? "flex" : "hidden"
        } border-background03 bg-background01 rounded-lg border-[12px] border-t-0 flex flex-col p-2 gap-1.5 ${classNameContent}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
