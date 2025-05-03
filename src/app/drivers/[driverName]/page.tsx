import { Driver } from "@/types/Driver";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ driverName: string }>;
}) {
  const driverName = (await params).driverName;

  const response = await fetch(
    process.env.API_HOST +
      ":" +
      process.env.API_PORT +
      "/drivers/" +
      driverName +
      "?expand=images,team",
  );

  const driver: Driver = await response.json(); //TODO: Handle error

  if (driver.images == null || driver.team == null) {
    return "Error";
  }

  const full_name = driver.first_name + " " + driver.last_name.toUpperCase();

  return (
    <div
      className={`
        flex flex-col
        w-64
        m-2 p-2
        border-solid border-1 border-gray-300
    `}
    >
      <Image
        src={process.env.IMAGE_URL + driver.images.profile_url}
        alt={`Picture of ${full_name}`}
        width={840}
        height={840}
      />
      <h1>{full_name}</h1>
    </div>
  );
}
