const SectionComp = async ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-full flex flex-col justify-center height_pattern">
      {children}
    </section>
  );
};

export default SectionComp;
