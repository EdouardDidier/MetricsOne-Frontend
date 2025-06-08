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
      <div className="mx-auto w-300">
        <h1>Races</h1>
        <div className="flex flex-col">
          {data.map((meeting, i) => {
            if (meeting.sessions == null) {
              // TODO: Handle error correctly
              return <div>Error</div>;
            }

            const round = i != 0 ? "Round " + meeting.number : "Testing";

            const startDate = new Date(meeting.sessions[0].start_date);
            const endDate = new Date(
              meeting.sessions[meeting.sessions.length - 1].end_date,
            );

            // TODO: create a helper function for formating date
            return (
              <Link href={`/races/${meeting.location.toLowerCase()}`}>
                <div
                  key={meeting.name}
                  className="my-1 border-solid border-1 border-gray-300"
                >
                  {round}
                  {": "}
                  {startDate.toLocaleString("en-US", { day: "2-digit" })}-
                  {endDate.toLocaleString("en-US", { day: "2-digit" })}{" "}
                  {endDate
                    .toLocaleString("en-US", { month: "short" })
                    .toUpperCase()}{" "}
                  {meeting.name}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
