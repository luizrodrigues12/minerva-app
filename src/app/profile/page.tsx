import { cookies } from "next/headers";
import UserModel from "@/models/userModel";
import UserDataComp from "@/components/page_/UserDataComp";
import SectionComp from "@/components/page_/SectionComp";
import { dataMongoUser } from "@/models/userModel";

const page = async () => {
  const token = (await cookies()).get("authorization")?.value;
  const user = await UserModel.findOne<dataMongoUser>({ token: token });

  return (
    <SectionComp>
      <UserDataComp
        username={user?.username!}
        email={user?.email!}
      ></UserDataComp>
    </SectionComp>
  );
};

export default page;
