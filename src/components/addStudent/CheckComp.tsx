type Props = {
  htmlFor: string;
  text: string;
  name: string;
  id: string;
  value: string;
  isChecked?: boolean;
  onChange?: () => void;
  onClick?: () => void;
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
}: Props) => {
  return (
    <div className="checkbox flex justify-between items-center p-3 px-4 bg-zinc-950 w-full rounded-lg shadow-md">
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
    </div>
  );
};

export default CheckComp;
