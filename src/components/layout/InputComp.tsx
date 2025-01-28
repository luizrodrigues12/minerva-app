import { Search } from "flowbite-react-icons/outline";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isSearch?: boolean;
}

const InputComp = ({
  type,
  name,
  autoComplete,
  value,
  onChange,
  onFocus,
  className,
  placeholder,
  isSearch,
}: InputProps) => {
  return (
    <div className="w-full relative">
      <input
        type={type}
        name={name}
        autoComplete={autoComplete}
        className={`flex text-textColor relative items-center p-2.5 border-0 bg-background03 rounded-[7px] text-[14px] w-full md:text-[15px] px-3 placeholder:text-inputText ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
      />
      {isSearch && (
        <Search
          size={22}
          strokeWidth={1.5}
          className={"text-corIcones absolute top-2.5 right-3"}
        />
      )}
    </div>
  );
};

export default InputComp;
