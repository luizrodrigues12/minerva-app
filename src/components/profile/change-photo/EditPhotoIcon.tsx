"use client";

import { Edit } from "flowbite-react-icons/outline";
import { Dispatch, SetStateAction } from "react";

interface EditPhotoProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const EditPhotoIcon = ({ setIsOpen }: EditPhotoProps) => {
  return (
    <div>
      <div
        className="absolute top-0 right-0 rounded-bl-md rounded-tr-sm"
        onClick={() => setIsOpen(true)}
      >
        <div
          className={`p-0.5 pl-1.5 bg-background03 pb-1 flex justify-center items-center hover:bg-roxominerva dark:hover:bg-roxominerva text-textColor cursor-pointer hover:text-zinc-200 rounded-bl-md rounded-tr-sm`}
        >
          <Edit size={24} />
        </div>
      </div>
    </div>
  );
};

export default EditPhotoIcon;
