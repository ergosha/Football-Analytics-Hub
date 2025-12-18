export const revalidate = 60;

export default async function TeamPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(
    `https://api.football-data.org/v4/teams/${id}`,
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

  return (
    <main className="max-w-3xl mx-auto p-6">
      {/* Club Info */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={team.crest}
          alt={team.name}
          className="w-16 h-16"
        />

        <h1 className="text-3xl font-bold">{team.name}</h1>
      </div>

      <div className="space-y-2 text-gray-700">
        <p>
          <strong>Founded:</strong> {team.founded ?? "—"}
        </p>
        <p>
          <strong>Stadium:</strong> {team.venue ?? "—"}
        </p>
        <p>
          <strong>Club Colors:</strong> {team.clubColors ?? "—"}
        </p>
        <p>
          <strong>Website:</strong>{" "}
          {team.website ? (
            <a
              href={team.website}
              target="_blank"
              className="text-blue-600 underline"
            >
              {team.website}
            </a>
          ) : (
            "—"
          )}
        </p>
      </div>

      {/* Squad Section */}
      {team.squad && team.squad.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Squad</h2>

          <div className="border rounded-lg overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[50px_1fr_150px_150px] bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700">
              <span>#</span>
              <span>Name</span>
              <span>Position</span>
              <span>Nationality</span>
            </div>

            {/* Player Rows */}
            {team.squad.map((player: any, index: number) => (
              <div
                key={player.id}
                className="grid grid-cols-[50px_1fr_150px_150px] px-4 py-2 border-t text-sm"
              >
                <span>{player.shirtNumber ?? index + 1}</span>
                <span className="font-medium">{player.name}</span>
                <span>{player.position ?? "—"}</span>
                <span>{player.nationality}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

