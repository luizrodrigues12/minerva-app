import { Spinner } from "flowbite-react";

const Loading = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0000001f] absolute z-20 top-0 bg-background01">
      <Spinner className="size-[25px] text-[#ffffffda] fill-[#4F47A8]" />
    </div>
  );
};

export default Loading;
