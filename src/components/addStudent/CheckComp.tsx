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
};

const CheckComp = ({
  htmlFor,
  text,
  name,
  id,
  value,
  isChecked,
  onChange,
  onClick,
  delay,
  animateComp,
  transition,
}: Props) => {
  return (
    <motion.div
      animate={animateComp ? animateComp : { opacity: [0, 1], y: [-10, 0] }}
      transition={
        transition ? transition : { duration: 0.3, delay: delay ? delay : 0 }
      }
      className="checkbox flex justify-between items-center p-3 px-4 bg-zinc-950 w-full rounded-lg shadow-md"
    >
      <label
        htmlFor={htmlFor}
        className="font-medium text-zinc-200 tracking-widest"
      >
        {text.toUpperCase()}
      </label>
      <input
        type="checkbox"
        className="bg-inherit border-2 border-roxominerva rounded-full"
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
