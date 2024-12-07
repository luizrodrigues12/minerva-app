import { Spinner } from "flowbite-react";

const Loading = () => {
  return (
    <div className="min-h-[108vh] w-full flex items-center justify-center bg-[#0000001f] absolute z-20 top-0 backdrop-blur-[0.5px]">
      <Spinner className="size-[25px] text-[#ffffffda] fill-[#4F47A8]" />
    </div>
  );
};

export default Loading;
