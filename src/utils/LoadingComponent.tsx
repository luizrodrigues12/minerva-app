"use client";
import { Spinner } from "flowbite-react";

const LoadingComponent = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <Spinner size="lg" />
    </div>
  );
};

export default LoadingComponent;
