import { Meeting } from "@/types/Meeting";
import Link from "next/link";

export default async function Page() {
  const response = await fetch(
    process.env.API_HOST +
      ":" +
      process.env.API_PORT +
      "/2025/meetings?expand=sessions",
  );

  const data: Array<Meeting> = await response.json();
  // TODO: Handle API error

  return (
    <div>
      <title>F1Metrics - Races</title>
      <h1>Races</h1>
      <div>
        <dl>
          {data.map((meeting) => {
            if (meeting.sessions == null) {
              return "Error";
            }

            return (
              <div key={meeting.name}>
                <dt>
                  <Link href={`/races/${meeting.location.toLowerCase()}`}>
                    {meeting.name}
                  </Link>
                </dt>
                {meeting.sessions.map((session) => {
                  return (
                    <dd
                      key={meeting.name + session.name}
                    >{`- ${session.name}`}</dd>
                  );
                })}
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
}
