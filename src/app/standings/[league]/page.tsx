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

      {/* Header row */}
      <div className="grid grid-cols-[40px_1fr_60px_60px_60px_60px] gap-2 px-4 py-2 text-sm font-semibold text-gray-600 border-b">
        <div className="text-right">#</div>
        <div>Team</div>
        <div className="text-right">Pts</div>
        <div className="text-right">GF</div>
        <div className="text-right">GA</div>
        <div className="text-right">GD</div>
      </div>

      {/* Data rows */}
      <div className="space-y-1 mt-2">
        {table.map((row: any) => (
          <div
            key={row.team.id}
            className="grid grid-cols-[40px_1fr_60px_60px_60px_60px] gap-2 px-4 py-3 bg-white rounded-lg shadow-sm"
          >
            {/* Position */}
            <div className="text-right text-gray-500">
              {row.position}
            </div>

            {/* Team */}
            <div className="flex items-center gap-3">
              <img
                src={row.team.crest}
                alt={row.team.name}
                className="w-6 h-6"
              />
              <span className="font-medium">
                {row.team.name}
              </span>
            </div>

            {/* Points */}
            <div className="text-right font-semibold">
              {row.points}
            </div>

            {/* Goals For */}
            <div className="text-right">
              {row.goalsFor}
            </div>

            {/* Goals Against */}
            <div className="text-right">
              {row.goalsAgainst}
            </div>

            {/* Goal Difference */}
            <div className="text-right">
              {row.goalDifference}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

