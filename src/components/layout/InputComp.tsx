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
  placeholder,
}: InputProps) => {
  return (
    <input
      type={type}
      name={name}
      autoComplete={autoComplete}
      className={`flex text-black items-center p-2.5 border-0 bg-background03 rounded-[7px] text-[14px] w-full mt-2 md:text-[15px] md:px-4 ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
    />
  );
};

export default InputComp;
