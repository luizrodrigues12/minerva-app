import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const InputComp = ({
  type,
  name,
  autoComplete,
  value,
  onChange,
  onFocus,
  className,
}: InputProps) => {
  return (
    <input
      type={type}
      name={name}
      autoComplete={autoComplete}
      className={`flex items-center p-2.5 border-0 bg-background01 rounded-[7px] text-[14px] w-full mt-2 md:text-[15px] md:px-4${className}`}
      placeholder={"usuário ou email"}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
    />
  );
};

export default InputComp;
