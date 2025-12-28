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

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

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

  const fixturesRes = await fetch(
  `https://api.football-data.org/v4/teams/${id}/matches?status=SCHEDULED&limit=5`,
  {
    headers: {
      "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY!,
    },
    next: { revalidate: 60 },
  }
);

const fixturesData = fixturesRes.ok ? await fixturesRes.json() : null;
const fixtures = fixturesData?.matches ?? [];

  if (!res.ok) {
    return <div className="p-6">Failed to load team</div>;
  }

  const team = await res.json();

return (
  <main className="max-w-5xl mx-auto p-6">
    {/* Team Header */}
    <div className="flex items-center gap-4 mb-6 pb-4 border-b">
      <img
        src={team.crest}
        alt={team.name}
        className="w-16 h-16"
      />
      <h1 className="text-3xl font-bold">
        {team.name}
      </h1>
    </div>

    {/* Overview Section */}
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14 bg-gray-50 p-6 rounded-xl">
      {/* Club Info */}
      <div className="space-y-2 text-gray-700">
        <h2 className="text-xl font-semibold mb-2">
          Club Info
        </h2>

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

      {/* Upcoming Matches */}
      {fixtures.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Upcoming Matches
          </h2>

          <div className="space-y-3">
            {fixtures.map((match: any) => {
              const isHome = match.homeTeam.id === team.id;
              const opponent = isHome
                ? match.awayTeam.name
                : match.homeTeam.name;

              return (
                <div
                  key={match.id}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">
                      {isHome ? "vs" : "@"} {opponent}
                    </p>
                    <p className="text-sm text-gray-600">
                      {match.competition.name}
                    </p>
                  </div>

                  <div className="text-sm text-gray-700">
                    {formatDate(match.utcDate)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>

    {/* Squad Section */}
    {team.squad && team.squad.length > 0 && (
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">
          Squad
        </h2>

        <div className="border rounded-xl overflow-hidden">
          {/* Header */}
          <div
            className="grid grid-cols-[50px_1.5fr_1fr_1fr_80px]
                       bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-600
                       sticky top-0 z-10"
          >
            <span className="text-center">#</span>
            <span>Name</span>
            <span>Position</span>
            <span>Nationality</span>
            <span className="text-center">Age</span>
          </div>

          {/* Rows */}
          {team.squad.map((player: any, index: number) => (
            <div
              key={player.id}
              className={`grid grid-cols-[50px_1.5fr_1fr_1fr_80px]
                          px-4 py-3 text-sm items-center
                          ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                          border-t`}
            >
              <span className="text-center text-gray-500">
                {player.shirtNumber ?? index + 1}
              </span>

              <a
                href={`/players/${player.id}?teamId=${team.id}`}
                className="font-medium hover:underline"
              >
                {player.name}
              </a>

              <span className="text-gray-600">
                {player.position ?? "—"}
              </span>

              <span className="text-gray-600">
                {player.nationality}
              </span>

              <span className="text-center text-gray-700">
                {player.dateOfBirth
                  ? calculateAge(player.dateOfBirth)
                  : "—"}
              </span>
            </div>
          ))}
        </div>
      </section>
    )}
  </main>
);
}
