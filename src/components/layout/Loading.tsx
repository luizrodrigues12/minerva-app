import { Spinner } from "flowbite-react";

const Loading = () => {
  return (
    <div className="min-h-[108vh] w-full flex items-center justify-center bg-[#0000006b] absolute z-20 top-0">
      <Spinner />
    </div>
  );
};

export default Loading;
