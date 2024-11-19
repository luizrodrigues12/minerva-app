import { cookies } from "next/headers";
import UserModel from "@/models/userModel";
import UserDataComp from "@/components/page_/UserDataComp";
import SectionComp from "@/components/page_/SectionComp";
import { dataMongoUser } from "@/models/userModel";

const page = async () => {
  return (
    <SectionComp>
      <UserDataComp></UserDataComp>
    </SectionComp>
  );
};

export default page;
