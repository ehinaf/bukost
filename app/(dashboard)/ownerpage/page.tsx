import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    return <div>Welcome to page Owner {session?.user?.name}</div>;
  }

  return <h2>Login terlebih dahulu</h2>;
};

export default page;
