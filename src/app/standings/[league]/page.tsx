import LeagueSelector from "@/app/components/LeagueSelecotor";

export const revalidate = 60;

const LEAGUES: Record<string, string> = {
  PL: "Premier League",
  PD: "La Liga",
  BL1: "Bundesliga",
  SA: "Serie A",
  FL1: "Ligue 1",
  CL: "Champions League",
  PPL: "Primeira Liga",
  DED: "Eredivisie",
  ELC: "Championship",
  BSA: "Serie A",
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
  const table =
    data.standings.find((s: any) => s.type === "TOTAL")?.table ?? [];

  return (
    <main className="max-w-5xl mx-auto p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">
          {LEAGUES[leagueCode]} Standings
        </h1>
        <p className="text-gray-600">
          Current league table
        </p>
      </div>

      {/* League Selector */}
      <div className="mb-6">
        <LeagueSelector currentLeague={leagueCode} />
      </div>

      {/* Standings Table */}
      <div className="border rounded-xl overflow-hidden">
        {/* Table Header */}
        <div
          className="grid grid-cols-[40px_1fr_repeat(8,_50px)]
                 bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-600
                 sticky top-0 z-10"
        >
          <span className="text-center">Pos</span>
          <span>Team</span>
          <span className="text-center">P</span>
          <span className="text-center">W</span>
          <span className="text-center">D</span>
          <span className="text-center">L</span>
          <span className="text-center">GF</span>
          <span className="text-center">GA</span>
          <span className="text-center">GD</span>
          <span className="text-center">Pts</span>
        </div>

        {/* Table Rows */}
        {table.map((row: any, index: number) => (
          <div
            key={row.team.id}
            className={`grid grid-cols-[40px_1fr_repeat(8,_50px)]
                    items-center px-4 py-3 text-sm
                    ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    border-t`}
          >
            {/* Position */}
            <span className="text-center font-medium text-gray-700">
              {row.position}
            </span>

            {/* Team */}
            <div className="flex items-center gap-3">
              <img
                src={row.team.crest}
                alt={row.team.name}
                className="w-6 h-6"
              />
              <a
                href={`/teams/${row.team.id}`}
                className="font-medium hover:underline"
              >
                {row.team.name}
              </a>
            </div>

            {/* Stats */}
            <span className="text-center">{row.playedGames}</span>
            <span className="text-center">{row.won}</span>
            <span className="text-center">{row.draw}</span>
            <span className="text-center">{row.lost}</span>
            <span className="text-center">{row.goalsFor}</span>
            <span className="text-center">{row.goalsAgainst}</span>
            <span className="text-center">{row.goalDifference}</span>

            {/* Points */}
            <span className="text-center font-semibold">
              {row.points}
            </span>
          </div>
        ))}
      </div>
    </main>

  );
}


