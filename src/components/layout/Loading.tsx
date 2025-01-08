import { Spinner } from "flowbite-react";

const Loading = ({ className }: { className?: string }) => {
  return (
    <div
      className={`min-h-screen w-full flex items-center justify-center bg-[#0000001f] fixed z-[100] top-0 left-0 bg-background01 ${className}`}
    >
      <Spinner className="size-[25px] text-[#ffffffda] fill-[#4F47A8]" />
    </div>
  );
};

export default Loading;
