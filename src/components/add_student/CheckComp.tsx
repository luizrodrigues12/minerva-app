import {
  AnimationControls,
  motion,
  TargetAndTransition,
  Transition,
  VariantLabels,
} from "motion/react";

type Props = {
  htmlFor: string;
  text: string;
  name: string;
  id: string;
  value: string;
  isChecked?: boolean;
  onChange?: () => void;
  onClick?: () => void;
  delay?: number;
  transition?: Transition | undefined;
  animateComp?:
    | boolean
    | AnimationControls
    | TargetAndTransition
    | VariantLabels
    | undefined;
  className?: string;
};

const CheckComp = ({
  htmlFor,
  text,
  name,
  id,
  value,
  onChange,
  onClick,
  delay,
  animateComp,
  transition,
  className,
}: Props) => {
  return (
    <motion.div
      animate={animateComp ? animateComp : { opacity: [0, 1], y: [-10, 0] }}
      transition={
        transition ? transition : { duration: 0.3, delay: delay ? delay : 0 }
      }
      className={`checkbox flex justify-between items-center p-3 px-4 bg-[#111111] w-full rounded-lg shadow-md ${className}`}
    >
      <label htmlFor={htmlFor} className="text-textwhite tracking-widest">
        {text.toUpperCase()}
      </label>
      <input
        type="checkbox"
        className="bg-inherit border-2 border-roxominerva rounded-full cursor-pointer"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        onClick={onClick}
      />
    </motion.div>
  );
};

export default CheckComp;
