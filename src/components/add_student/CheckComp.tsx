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
      className={`checkbox flex justify-between items-center p-3 px-4 bg-[#00000030] w-full rounded-lg shadow-md ${className}`}
    >
      <label htmlFor={htmlFor} className="text-textwhite tracking-widest">
        {text.toUpperCase()}
      </label>
      <motion.input
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.02 }}
        type="checkbox"
        className="bg-transparent border-2 p-[7px] border-roxominerva rounded-full cursor-pointer checked:bg-roxominerva"
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
