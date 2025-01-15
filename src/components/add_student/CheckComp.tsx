import {
  AnimationControls,
  motion,
  TargetAndTransition,
  Transition,
  VariantLabels,
} from "motion/react";
import { InputHTMLAttributes } from "react";

interface PropsCheckComp
  extends InputHTMLAttributes<HTMLInputElement | HTMLInputElement> {
  text: string;
}

const CheckComp = ({
  text,
  name,
  id,
  value,
  onChange,
  onClick,
  className,
  checked,
  defaultChecked,
}: PropsCheckComp) => {
  return (
    <div
      className={`checkbox flex justify-between items-center p-3 md:px-4 bg-background03 w-full rounded-lg font-inter ${className}`}
    >
      <label className="text-[#303030]">{text.toUpperCase()}</label>
      <motion.input
        whileHover={{ scale: 1.05, transition: { duration: 0.05 } }}
        type="checkbox"
        className="bg-transparent border-[1.5px] border-roxominerva rounded-full cursor-pointer checked:bg-roxominerva  checked:border-2 focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-background03 size-[21px] md:border-2"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        onClick={onClick}
        checked={checked}
        defaultChecked={defaultChecked}
      />
    </div>
  );
};

export default CheckComp;
