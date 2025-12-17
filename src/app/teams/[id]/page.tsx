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
    </main>
  );
}
