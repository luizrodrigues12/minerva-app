import { AngleDown, AngleUp } from "flowbite-react-icons/outline";
import { ReactNode, useState } from "react";

interface Props {
  textLeft: string;
  textRight?: string;
  children?: ReactNode;
  className?: string;
  classNameContent?: string;
  disable?: boolean;
}

const Accordion = ({
  textLeft,
  textRight,
  children,
  className,
  classNameContent,
  disable = false,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`w-full bg-background03 rounded-md tracking-wide ${className}`}
    >
      <div
        className="flex justify-between py-2.5 md:py-3 cursor-pointer"
        onClick={() => {
          if (!disable) setIsOpen(!isOpen);
        }}
      >
        <div
          className={` text-[14px] md:text-[16px] flex w-full px-3 items-center ${
            disable ? "text-inputText" : "text-textColor"
          }`}
        >
          <p className="pr-2">
            {textLeft.split("")[0].toUpperCase() + textLeft.slice(1)}
          </p>
          {textRight && (
            <div className="flex">
              <p>-</p>
              <p className="pl-2">{textRight}</p>
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
