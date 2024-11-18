import PageHome from "@/components/page_/CompHome";
import SectionComp from "@/components/page_/SectionComp";

const page = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return (
    <SectionComp>
      <PageHome />
    </SectionComp>
  );
};

export default page;
