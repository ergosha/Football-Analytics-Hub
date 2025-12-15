export const revalidate = 60;

const LEAGUES: Record<string, string> = {
  PL: "Premier League",
  PD: "La Liga",
  BL1: "Bundesliga",
  SA: "Serie A",
  FL1: "Ligue 1",
};

export default async function StandingsPage({
  params,
}: {
  params: Promise<{ league: string }>;
}) {
  const { league } = await params;
  const leagueCode = league.toUpperCase();

  if (!LEAGUES[leagueCode]) {
    return <div className="p-6">League not supported</div>;
  }

  const res = await fetch(
    `https://api.football-data.org/v4/competitions/${leagueCode}/standings`,
    {
      headers: {
        "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY!,
      },
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    return <div className="p-6 text-red-600">Failed to load standings</div>;
  }

  const data = await res.json();
  const table = data.standings.find(
    (s: any) => s.type === "TOTAL"
  )?.table;

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        {LEAGUES[leagueCode]} Standings
      </h1>

      <div className="space-y-2">
        {table.map((row: any) => (
          <div
            key={row.team.id}
            className="flex justify-between items-center bg-white p-4 rounded-xl shadow"
          >
            <div className="flex items-center gap-3">
              <span className="text-gray-500 w-5 text-right">
                {row.position}
              </span>

              <img
                src={row.team.crest}
                alt={row.team.name}
                className="w-7 h-7"
              />

              <span className="font-medium">
                {row.team.name}
              </span>
            </div>

            <span className="font-semibold">
              {row.points} pts
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
