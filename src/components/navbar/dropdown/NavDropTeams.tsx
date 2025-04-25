import NavDropLink from "./NavDropLink";
import NavDropMainLink from "./NavDropMainLink";
import { Team } from "@/types/Team";

export default async function NavDropTeams() {
  // Fetch teams data from API
  const response = await fetch(
    process.env.API_HOST + ":" + process.env.API_PORT + "/teams",
  );

  // TODO: Handle fetch error
  // if (!data) return <>Error while loading data</>;
  const data: Array<Team> = await response.json();

  // Sort teams by name name
  data.sort((a: Team, b: Team) =>
    a.name > b.name ? 1 : b.name > a.name ? -1 : 0,
  );

  return (
    <>
      <div className="w-262 m-auto pt-4 pb-3 font-bold text-2xl border-b border-solid border-gray-700">
        <NavDropMainLink href="/teams">All Teams</NavDropMainLink>
      </div>
      <div className="grid grid-cols-4 gap-2 w-262 my-4 mx-auto">
        {data.map((team) => (
          // Parent div for each driver
          <div
            key={team.name}
            className="group relative rounded-br-xl overflow-hidden bg-gray-800 border-solid border-1 border-gray-400 "
          >
            <NavDropLink // Foreground container
              href={`/teams/${team.url_name}`}
            >
              <div
                className={`
                  w-full h-17
                  flex flex-row
                  cursor-pointer
                `}
              >
                <div
                  className={`
                  py-2 px-3 w-full h-full absolute
                  flex items-center justify-end text-lg
                  group-hover:opacity-0 transition-[opacity]
                  cursor-pointer
                `}
                >
                  {team.name}
                  <i className="arrow -rotate-45 ml-2"></i>
                </div>
                <div className="absolute w-full h-full flex items-center">
                  <i // Team color
                    className="w-full h-6 relative left-full group-hover:left-0 transition-[left]"
                    style={{ backgroundColor: `#${team.colour}` }}
                  ></i>
                </div>
                <div className="relative right-41 group-hover:right-0 transition-[right]">
                  <img
                    src={`/teams/cars/${team.year}/${team.url_name}.avif`}
                    alt="Picture of team car"
                  />
                </div>
              </div>
            </NavDropLink>
          </div>
        ))}
      </div>
    </>
  );
}
