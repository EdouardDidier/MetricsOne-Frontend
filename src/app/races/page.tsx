"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Meeting } from "@/types/Meeting";

export default function Page() {
  // TODO: This data fetching is a proof of concept for future pages
  // Go back to server-side data fetching with revalidation later
  const [meetings, setMeetings] = useState<Array<Meeting>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        let response: Response = new Response();
        let status = 0;

        while (status != 200) {
          response = await fetch(
            process.env.API_HOST +
              ":" +
              process.env.API_PORT +
              "/2025/meetings?expand=sessions",
          );

          status = response.status;

          // Wait between each request
          await new Promise((res) => setTimeout(res, 200));
        }

        let data = await response.json();

        // Sort driver by last name
        data.sort((a: Meeting, b: Meeting) =>
          a.number > b.number ? 1 : b.number > a.number ? -1 : 0,
        );

        setMeetings(data);
      } catch (error) {
        console.log("Failed to fetch meetings", error);
      } finally {
        setIsLoading(false);
      }
    };

    console.log("fetching meetings");
    fetchMeetings();
  }, []);

  // TODO: Handle API error

  if (isLoading)
    return (
      <div>
        <title>F1Metrics - Races</title>
        <div className="mx-auto w-300">
          <h1>Races</h1>
          <div
            className="mx-auto animate-spin inline-block size-6 border-3 border-current border-t-transparent text-red-600 rounded-full"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );

  return (
    <div>
      <title>F1Metrics - Races</title>
      <div className="mx-auto w-300">
        <h1>Races</h1>
        <div className="flex flex-col">
          {meetings.map((meeting, i) => {
            if (meeting.sessions == null) {
              // TODO: Handle error correctly
              return <div key={i}>Error</div>;
            }

            const round = i != 0 ? "Round " + meeting.number : "Testing";

            const startDate = new Date(meeting.sessions[0].start_date);
            const endDate = new Date(
              meeting.sessions[meeting.sessions.length - 1].end_date,
            );

            // TODO: create a helper function for formating date
            return (
              <Link
                key={meeting.name}
                href={`/races/${meeting.location.toLowerCase()}`}
              >
                <div className="my-1 border-solid border-1 border-gray-300">
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
