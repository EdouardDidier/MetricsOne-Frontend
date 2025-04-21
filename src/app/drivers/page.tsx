interface Driver {
  full_name: string;
  headshot_url: string;
  driver_number: number;
}

export default async function Page() {
  const response = await fetch(
    "https://api.openf1.org/v1/drivers?session_key=latest",
  );
  const data: Array<Driver> = await response.json();

  return (
    <div>
      <title>F1Metrics - Drivers</title>
      <h1>Drivers</h1>
      <div className="flex flex-row flex-wrap">
        {data.map((driver) => (
          <div
            className={`
              border-solid border-1 border-gray-300
              m-1 p-2 w-32
            `}
            key={driver.full_name}
          >
            <img src={driver.headshot_url} alt={driver.full_name} />
            {driver.driver_number} {driver.full_name}
          </div>
        ))}
      </div>
    </div>
  );
}
