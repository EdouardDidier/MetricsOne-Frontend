import NavDropLink from "./NavDropLink";
import { Team } from "@/types/team";
import NavDropMainLink from "./NavDropMainLink";

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
            className="group relative rounded-br-xl overflow-hidden border-solid border-1 border-gray-400 "
          >
            <div // Background container
              className={`
              absolute -z-10
              w-full h-11
              flex flex-row-reverse 
            bg-gray-800
            `}
            ></div>
            <NavDropLink // Foreground container
              href={`/teams/${team.name.toLowerCase().replaceAll(" ", "-")}`}
            >
              <div
                className={`
                py-2 px-3 w-full h-11
                flex items-center
                cursor-pointer
              `}
              >
                <i // Team color
                  className="inline-block w-1.5 h-5 mr-2"
                  style={{ backgroundColor: `#${team.colour}` }}
                ></i>
                {team.name}
                <i className="arrow -rotate-45 ml-auto transition-[opacity] group-hover:opacity-0"></i>
              </div>
            </NavDropLink>
          </div>
        ))}
      </div>
    </>
  );
}
