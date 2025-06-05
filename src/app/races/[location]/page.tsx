import { Meeting } from "@/types/Meeting";

export default async function Page({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const location = (await params).location;

  //TODO: Use single meeting endpoint when avalaible
  const response = await fetch(
    process.env.API_HOST +
      ":" +
      process.env.API_PORT +
      "/2025/meetings?location=" +
      location +
      "&expand=sessions",
  );

  //TODO: Handle error
  const meeting: Meeting = (await response.json())[0];

  if (meeting.sessions == null) {
    return "Error";
  }

  return (
    <div>
      <h1 className={"font-bold"}>{meeting.name}</h1>
      <div>
        {meeting.sessions.map((session) => {
          const date = new Date(session.start_date);
          return (
            <div
              key={session.name}
            >{`${date.toString()}- ${session.name}`}</div>
          );
        })}
      </div>
    </div>
  );
}
