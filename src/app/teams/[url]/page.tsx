import { Team } from "@/types/Team";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ url: string }>;
}) {
  const teamUrl = (await params).url;

  const response = await fetch(
    process.env.API_HOST +
      ":" +
      process.env.API_PORT +
      "/teams/" +
      teamUrl +
      "?expand=images,drivers",
  );

  const team: Team = await response.json(); //TODO: Handle error

  if (team.images == null || team.drivers == null) {
    return "Error";
  }

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
        src={process.env.IMAGE_URL + team.images.logo_url}
        alt={`Picture of ${team.name} logo`}
        width={1367}
        height={764}
      />
      <h1>{team.name}</h1>
    </div>
  );
}
