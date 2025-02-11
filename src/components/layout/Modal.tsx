import { CloseCircle } from "flowbite-react-icons/outline";
import React, { Dispatch, ReactNode, SetStateAction } from "react";

interface ModalProps {
  children: ReactNode;
  className?: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Modal = ({ children, className, setIsOpen }: ModalProps) => {
  return (
    <div className="modal bg-[#10101033] dark:bg-[#10101080] flex justify-center items-center text-[14px] md:text-[16px] pb-[50%] md:pb-0">
      <div
        className={`p-3 pt-2.5 rounded-md bg-background03 w-[90%] md:w-[60%] lg:w-[30%] xl:w-[22%] text-textColor ${className}`}
      >
        <div
          className="w-full flex justify-end items-center cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          <CloseCircle className="mt-0.5 md:mt-0 md:mb-0.5" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
