import { db } from "@/db";
import { notFound } from "next/navigation";
import DesignConfigurator from "./DesignConfigurator";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

// type Props = {
//   searchParams: {
//     [key: string]: string | string[] | undefined;
//   };
// };
export default async function Page(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const { id } = searchParams;

  if (!id || typeof id !== "string") {
    return notFound();
  }

  const configuration = await db.configuration.findUnique({
    where: { id },
  });

  if (!configuration) {
    return notFound();
  }

  const { imageUrl, width, height } = configuration;

  return (
    <DesignConfigurator
      configId={configuration.id}
      imageDimension={{ width, height }}
      imageUrl={imageUrl}
    />
  );
}
