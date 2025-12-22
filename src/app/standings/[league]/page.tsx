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
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        {LEAGUES[leagueCode]} Standings
      </h1>

      <LeagueSelector currentLeague={leagueCode} />

      {/* Header row */}
      <div className="grid grid-cols-[40px_1fr_repeat(8,_50px)] gap-2 text-sm text-gray-600 font-semibold px-4 py-2">
        <span className="text-right">Pos</span>
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

      {/* Data rows */}
      <div className="space-y-1 mt-2">
        {table.map((row: any) => {
          
          return (
            <div
              key={row.team.id}
              className={`grid grid-cols-[40px_1fr_repeat(8,_50px)] gap-2 items-center px-4 py-3 rounded-lg shadow-sm`}
            >
              {/* Position */}
              <span
                className={`text-right`}
              >
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
              <span className="text-center font-semibold">{row.points}</span>
            </div>
          );
        })}
      </div>
    </main>
  );
}


