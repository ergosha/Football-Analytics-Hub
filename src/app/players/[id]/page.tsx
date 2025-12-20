export const revalidate = 60;

function calculateAge(dateOfBirth: string) {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

export default async function PlayerPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ teamId?: string }>;
}) {
  const { id } = await params;
  const { teamId } = await searchParams;

  if (!teamId) {
    return <div className="p-6">Missing team context</div>;
  }

  const res = await fetch(
    `https://api.football-data.org/v4/teams/${teamId}`,
    {
      headers: {
        "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY!,
      },
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    return <div className="p-6">Failed to load team</div>;
  }

  const team = await res.json();
  const player = team.squad.find(
    (p: any) => String(p.id) === id
  );

  if (!player) {
    return <div className="p-6">Player not found</div>;
  }

  console.log(player);

  return (

    


    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">
        {player.name}
      </h1>

      <div className="space-y-2 text-gray-700">
        <p>
          <strong>Team:</strong> {team.name}
        </p>
        <p>
          <strong>Position:</strong> {player.position ?? "—"}
        </p>
        <p>
          <strong>Nationality:</strong> {player.nationality}
        </p>
        {/* Only show if shirt number exists 
        {player.shirtNumber && (
           <p>
          <strong>Shirt number:</strong> {player.shirtNumber}
            </p>
              )} */}
        <p>
          <strong>Age:</strong>{" "}
          {player.dateOfBirth
            ? calculateAge(player.dateOfBirth)
            : "—"}
        </p>
      </div>
    </main>
  );
}
