import { Eye } from "flowbite-react-icons/outline";
import { EyeSlash } from "flowbite-react-icons/solid";
import { SetStateAction } from "react";

type EyeProps = {
  isShow: boolean;
  setIsShow: (value: SetStateAction<boolean>) => void;
};

const EyeComp = ({ isShow, setIsShow }: EyeProps) => {
  return (
    <div>
      {isShow ? (
        <EyeSlash
          className="absolute z-[1] bottom-2.5 right-2.5 text-inputText md:right-4 cursor-pointer"
          onClick={() => {
            setIsShow(false);
          }}
        />
      ) : (
        <Eye
          className="absolute z-[1] bottom-2.5 right-2.5 text-inputText md:right-4 cursor-pointer"
          onClick={() => {
            setIsShow(true);
          }}
        />
      )}
    </div>
  );
};

export default EyeComp;
