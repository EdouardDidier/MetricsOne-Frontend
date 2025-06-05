import { Meeting } from "@/types/Meeting";
import Link from "next/link";

export default async function Page() {
  const response = await fetch(
    process.env.API_HOST + ":" + process.env.API_PORT + "/2025/meetings",
  );

  const data: Array<Meeting> = await response.json();
  // TODO: Handle API error

  return (
    <div>
      <title>F1Metrics - Races</title>
      <h1>Races</h1>
      <div>
        {data.map((meeting) => {
          return (
            <div key={meeting.name}>
              <Link href={`/races/${meeting.location.toLowerCase()}`}>
                {meeting.name}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
