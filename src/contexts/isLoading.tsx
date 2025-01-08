// "use client";

// import {
//   createContext,
//   Dispatch,
//   ReactNode,
//   SetStateAction,
//   useContext,
//   useState,
// } from "react";

// type isLoadingProps = {
//   isLoading: boolean;
//   setIsLoading: Dispatch<SetStateAction<boolean>>;
// };

// const IsLoadingContext = createContext<isLoadingProps>({} as isLoadingProps);

// const IsLoadingProvider = ({ children }: { children: ReactNode }) => {
//   const [isLoading, setIsLoading] = useState(false);

//   return (
//     <IsLoadingContext.Provider value={{ isLoading: isLoading!, setIsLoading }}>
//       {children}
//     </IsLoadingContext.Provider>
//   );
// };

// const useIsLoadingContext = () => useContext(IsLoadingContext);

// export { IsLoadingProvider, useIsLoadingContext };
