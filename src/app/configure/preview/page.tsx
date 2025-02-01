import { db } from "@/db";
import { notFound } from "next/navigation";
import DesignPreview from "./DesignPreview";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const Page = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  const { id } = searchParams;
  const { getUser } = getKindeServerSession();
  const user: KindeUser | null = await getUser();
  if (!id || typeof id !== "string") {
    return notFound();
  }

  const configuration = await db.configuration.findUnique({
    where: { id },
  });

  if (!configuration) {
    return notFound();
  }

  return <DesignPreview configuration={configuration} user={user!} />;
};

export default Page;
