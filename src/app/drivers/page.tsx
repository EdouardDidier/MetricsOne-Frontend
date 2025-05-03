import { Driver } from "@/types/Driver";
import Image from "next/image";

export default async function Page() {
  const response = await fetch(
    process.env.API_HOST +
      ":" +
      process.env.API_PORT +
      "/drivers?expand=team,images",
  );
  const data: Array<Driver> = await response.json();
  // TODO: Handle API error

  return (
    <div>
      <title>F1Metrics - Drivers</title>
      <h1>F1 Drivers 2025</h1>
      <div className="flex flex-row flex-wrap">
        {data.map((driver) => {
          if (driver.images == null) {
            return "Error"; // TODO: Add error handling
          }

          const full_name =
            driver.first_name + " " + driver.last_name.toUpperCase();

          return (
            <div
              className={`
              border-solid border-1 border-gray-300
              m-1 p-2 w-32
            `}
              key={full_name}
            >
              <Image
                src={process.env.IMAGE_URL + driver.images.headshot_url}
                alt={`Picture of ${full_name}`}
                width={840}
                height={840}
              />
              {driver.number} {full_name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
