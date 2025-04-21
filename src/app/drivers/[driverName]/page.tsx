interface Driver {
  first_name: string;
  last_name: string;
  full_name: string;
  driver_number: number;
  team_colour: string;
  headshot_url: string;
}

// TODO: Check if str is expected format
function get_full_name(str: string): string {
  const split = str.split("-");

  return (
    split[0].charAt(0).toUpperCase() +
    split[0].slice(1) +
    " " +
    split[1].toUpperCase()
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ driverName: string }>;
}) {
  const driverName = get_full_name((await params).driverName);

  const response = await fetch(
    "https://api.openf1.org/v1/drivers?session_key=latest&full_name=" +
      driverName,
  );
  const data: Driver = (await response.json())[0]; //TODO: Check if there is at least one elem in the response

  return (
    <div
      className={`
      m-2 p-2
      border-solid border-1 border-gray-300
    `}
    >
      <img src={data.headshot_url} alt={data.full_name} />
      <h1>{data.full_name}</h1>
    </div>
  );
}
