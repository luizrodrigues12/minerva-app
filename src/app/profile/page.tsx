import { cookies } from "next/headers";
import UserModel from "@/models/userModel";
import UserDataComp from "@/components/pages/UserDataComp";
import SectionComp from "@/components/pages/SectionComp";
import { dataMongoUser } from "@/models/userModel";

const page = async () => {
  return <UserDataComp />;
};

export default page;
