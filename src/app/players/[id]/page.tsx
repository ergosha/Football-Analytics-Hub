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
      {/* Back link */}
      <a
        href={`/teams/${team.id}`}
        className="text-sm text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Back to {team.name}
      </a>

      {/* Player Header */}
      <h1 className="text-3xl font-bold mb-6">
        {player.name}
      </h1>

      {/* Player Info Card */}
      <div className="border rounded-xl p-6 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-gray-700">
          <div>
            <span className="block text-sm text-gray-500">
              Team
            </span>
            <span className="font-medium">
              {team.name}
            </span>
          </div>

          <div>
            <span className="block text-sm text-gray-500">
              Position
            </span>
            <span className="font-medium">
              {player.position ?? "—"}
            </span>
          </div>

          <div>
            <span className="block text-sm text-gray-500">
              Nationality
            </span>
            <span className="font-medium">
              {player.nationality}
            </span>
          </div>

          <div>
            <span className="block text-sm text-gray-500">
              Age
            </span>
            <span className="font-medium">
              {player.dateOfBirth
                ? calculateAge(player.dateOfBirth)
                : "—"}
            </span>
          </div>
        </div>
      </div>
    </main>
  );

}
