import { AngleDown, AngleUp } from "flowbite-react-icons/outline";
import { Dispatch, SetStateAction, useState } from "react";
import InputComp from "./InputComp";
import { allMonths } from "@/utils/months";
import Loading from "./Loading";

type SelectProps = {
  setMonthName: Dispatch<SetStateAction<string>>;
  monthName: string;
  setMonthDays: Dispatch<SetStateAction<number>>;
  monthDays: number;
  setMonthNumber: Dispatch<React.SetStateAction<number>>;
  setError: Dispatch<React.SetStateAction<string>>;
};

const SelectMonth = ({
  setMonthDays,
  monthDays,
  setMonthName,
  monthName,
  setMonthNumber,
  setError,
}: SelectProps) => {
  const [busca, setBusca] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const getFilteredMonths = () => {
    return allMonths.filter((month) =>
      month.name.toLowerCase().startsWith(busca.toLowerCase())
    );
  };

  return (
    <div>
      {getFilteredMonths().length ? (
        <div className="flex flex-col gap-2">
          <div className="text-[16px] md:text-[18px]">Mês</div>
          <div className="rounded-md relative">
            <div
              className="rounded-md bg-background03 flex justify-between items-center cursor-pointer"
              onClick={() => {
                setIsOpen(!isOpen);
                setError("");
              }}
            >
              <InputComp
                className="placeholder:text-textColor cursor-pointer py-3 text-[14px] md:text-[16px]"
                placeholder={monthName}
                value={busca || ""}
                onChange={(e) => setBusca(e.target.value)}
              />
              {isOpen ? (
                <div className="px-3">
                  <AngleUp className="text-corIcones size-[22px]" />
                </div>
              ) : (
                <div className="px-3">
                  <AngleDown className="text-corIcones size-[22px]" />
                </div>
              )}
            </div>
            {isOpen && (
              <div className="flex flex-col bg-background03 mt-1 rounded-md absolute z-[2] w-full max-h-[153px] md:max-h-[165px] overflow-y-scroll overflow-hidden scroll-style border-[1px] border-borderColor">
                {getFilteredMonths().map((month, i) => (
                  <div
                    key={i}
                    className={`flex items-center py-2 hover:bg-background03Hover cursor-pointer text-[14px] md:text-[16px] ${
                      i === getFilteredMonths().length! - 1
                        ? "border-0 pb-2.5"
                        : "border-b-[1px] border-borderColor"
                    }`}
                    onClick={() => {
                      setMonthName(month.name);
                      setMonthDays(month.dias);
                      setMonthNumber(i);
                      setBusca("");
                      setIsOpen(false);
                    }}
                  >
                    <div key={i} className="px-3 text-[14px] md:text-[16px]">
                      {month.name}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default SelectMonth;
