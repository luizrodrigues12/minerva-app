const SectionComp = async ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-full flex flex-col justify-center">
      {children}
    </section>
  );
};

export default SectionComp;
