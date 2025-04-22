import NavDropLink from "./NavDropLink";
import { Driver } from "@/types/Driver";

export default async function NavDropDrivers() {
  // Fetch data from OpenF1 API
  // TODO: Update with M1 API when available
  const response = await fetch(
    "https://api.openf1.org/v1/drivers?session_key=latest",
  );
  // TODO: Handle fetch error
  // if (!data) return <>Error while loading data</>;
  const data: Array<Driver> = await response.json();

  // Sort driver by last name
  data.sort((a: Driver, b: Driver) =>
    a.last_name > b.last_name ? 1 : b.last_name > a.last_name ? -1 : 0,
  );

  return (
    <div className="grid grid-cols-4 gap-2 p-4 mx-auto">
      {data.map((driver) => (
        // Parent div for each driver
        <div
          key={driver.full_name}
          className="group relative rounded-br-xl overflow-hidden border-solid border-1 border-gray-400 "
        >
          <div // Background container
            className={`
              absolute -z-10
              w-64 h-11
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
              style={{ backgroundColor: `#${driver.team_colour}` }}
            >
              <img
                className="mr-3"
                src={driver.headshot_url}
                alt="Driver headshot"
              />
            </div>
            <div // Skewed background animation
              className={`
                h-full 
                border-solid border-t-transparent border-r-0 border-t-44
                transition-[border] group-hover:border-r-30
              `}
              style={{ borderRightColor: `#${driver.team_colour}` }}
            ></div>
          </div>
          <NavDropLink // Foreground container
            driver={driver}
          >
            <div
              className={`
                py-2 px-3 w-64 h-11
                flex items-center
                cursor-pointer
              `}
            >
              <i // Team color
                className="inline-block w-1.5 h-5 mr-2"
                style={{ backgroundColor: `#${driver.team_colour}` }}
              ></i>
              {driver.first_name}
              <span className="font-bold ml-1">
                {driver.last_name.toUpperCase()}
              </span>
              <i className="arrow -rotate-45 ml-auto transition-[opacity] group-hover:opacity-0"></i>
            </div>
          </NavDropLink>
        </div>
      ))}
    </div>
  );
}
