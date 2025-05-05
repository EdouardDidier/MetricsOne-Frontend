import { Team } from "@/types/Team";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const response = await fetch(
    process.env.API_HOST +
      ":" +
      process.env.API_PORT +
      "/teams?expand=images,drivers",
  );

  const teams: Array<Team> = await response.json();

  return (
    <div>
      <title>F1Metrics - Teams</title>
      <h1>F1 Teams 2025</h1>
      <div className="flex flex-row flex-wrap">
        {teams.map((team) => {
          if (team.images == null || team.drivers == null) {
            return "Error";
          }

          return (
            <Link key={team.name} href={`/teams/${team.url}`}>
              <div
                className={`
              border-solid border-1 border-gray-300
              m-1 p-2 w-128
            `}
                key={team.name}
              >
                <Image
                  src={process.env.IMAGE_URL + team.images.car_url}
                  alt={`Picture of ${team.name} car`}
                  width={465}
                  height={129}
                />
                {team.name}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
