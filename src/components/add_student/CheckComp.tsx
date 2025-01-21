import {
  AnimationControls,
  motion,
  TargetAndTransition,
  Transition,
  VariantLabels,
} from "motion/react";
import { InputHTMLAttributes, SetStateAction } from "react";

interface PropsCheckComp
  extends InputHTMLAttributes<HTMLInputElement | HTMLInputElement> {
  text: string;
  setError: (value: SetStateAction<string>) => void;
  id: string;
}

const CheckComp = ({
  text,
  name,
  id,
  value,
  onChange,
  onClick,
  className,
  setError,
  checked,
  defaultChecked,
}: PropsCheckComp) => {
  const checkInput = () => {
    const input: any = document.getElementById(id!);
    if (input?.checked === true) {
      input.checked = false;
    } else {
      input!.checked = true;
    }
  };

  return (
    <div
      className={`checkbox flex justify-between items-center p-[11.5px] md:px-4 bg-background03 w-full rounded-lg font-inter cursor-pointer ${className}`}
      id={`div-check`}
      onClick={() => {
        checkInput();
        setError("");
      }}
    >
      <label className="text-textColor text-[14px] md:text-base cursor-pointer">
        {text}
      </label>
      <motion.input
        whileHover={{ scale: 1.03, transition: { duration: 0.05 } }}
        type="checkbox"
        className="bg-transparent border-[1.5px] border-corIcones rounded-full cursor-pointer checked:bg-corIcones checked:dark:bg-roxominerva checked:border-2 focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-background03 size-[21px] md:border-2 mr-[1px]"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        onClick={() => {
          checkInput();
          setError("");
        }}
        checked={checked}
        defaultChecked={defaultChecked}
      />
    </div>
  );
};

export default CheckComp;
