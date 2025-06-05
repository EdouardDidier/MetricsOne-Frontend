import Image from "next/image";
import NavDropLink from "./NavDropLink";
import NavDropMainLink from "./NavDropMainLink";
import { Driver } from "@/types/Driver";
import ActiveBorder from "@/components/utils/ActiveBorder";

export default async function NavDropDrivers() {
  // Fetch data from OpenF1 API
  // TODO: Update with M1 API when available
  const response = await fetch(
    process.env.API_HOST +
      ":" +
      process.env.API_PORT +
      "/2025/drivers?expand=team,images",
  );

  // TODO: Handle fetch error
  // if (!data) return <>Error while loading data</>;
  const data: Array<Driver> = await response.json();

  // Sort driver by last name
  data.sort((a: Driver, b: Driver) =>
    a.last_name > b.last_name ? 1 : b.last_name > a.last_name ? -1 : 0,
  );

  return (
    <>
      <div className="w-262 m-auto pt-4 pb-3 font-bold text-2xl border-b border-solid border-gray-700">
        <NavDropMainLink href="/drivers">All Drivers</NavDropMainLink>
      </div>
      <div className="grid grid-cols-4 gap-2 w-262 my-4 mx-auto">
        {data.map((driver) => {
          if (driver.images == null || driver.team == null) {
            return "Error";
          } //TODO: Handle null object

          const full_name =
            driver.first_name + " " + driver.last_name.toUpperCase();
          const headshot_url =
            process.env.IMAGE_URL + driver.images.headshot_url;

          return (
            // Parent div for each driver
            <ActiveBorder
              key={full_name}
              hoverColour={`#${driver.team.colour}`}
              currentPath={`/drivers/${driver.url}`}
              className="group relative rounded-br-xl overflow-hidden border-solid border-1 border-gray-400 transition-colors"
            >
              <div // Background container
                className={`
                  absolute -z-10
                  w-full h-11
                  flex flex-row-reverse 
                bg-gray-800
                `}
              >
                <div // Image aniamation
                  className={`
                    flex flex-row-reverse 
                    transition-[width]
                    h-full w-0 group-hover:w-12
                  `}
                  style={{ backgroundColor: `#${driver.team.colour}` }}
                >
                  <Image
                    className="mr-3"
                    src={headshot_url}
                    alt={`Picture of ${full_name}`}
                    width={840}
                    height={840}
                  />
                </div>
                <div // Skewed background animation
                  className={`
                    h-full 
                    border-solid border-t-transparent border-r-0 border-t-44
                    transition-[border] group-hover:border-r-30
                  `}
                  style={{ borderRightColor: `#${driver.team.colour}` }}
                ></div>
              </div>
              <NavDropLink // Foreground container
                href={`/drivers/${driver.url}`}
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
                    style={{ backgroundColor: `#${driver.team.colour}` }}
                  ></i>
                  {driver.first_name}
                  <span className="font-bold ml-1">
                    {driver.last_name.toUpperCase()}
                  </span>
                  <i className="arrow -rotate-45 ml-auto transition-[opacity] group-hover:opacity-0"></i>
                </div>
              </NavDropLink>
            </ActiveBorder>
          );
        })}
      </div>
    </>
  );
}
