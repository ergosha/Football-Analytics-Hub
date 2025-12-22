const leagues = [
  { code: "PL", name: "Premier League" },
  { code: "PD", name: "La Liga" },
  { code: "BL1", name: "Bundesliga" },
  { code: "SA", name: "Serie A" },
  { code: "FL1", name: "Ligue 1" },
  { code: "CL", name: "Champions League" },
  { code: "PPL", name: "Primeira Liga" },
  { code: "DED", name: "Eredivisie" },
  { code: "ELC", name: "Championship" },
  { code: "BSA", name: "Serie A" },
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-4 text-center">
        Football Analytics Dashboard
      </h1>

      {/* Description */}
      <p className="text-gray-600 text-center max-w-xl mb-10"
      >
        Explore league standings, team profiles, squads, and upcoming
        fixtures using real football data.
      </p>

      {/* League Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-xl">
        {leagues.map((league) => (
          <a
            key={league.code}
            href={`/standings/${league.code}`}
            className="border rounded-xl p-6 text-center
                       hover:shadow-md transition
                       bg-white"
          >
           <h2 className="text-xl font-semibold">
            {league.name}
            </h2> 
            <p className="text-sm text-gray mt-1">
              View Standings →
            </p>
          </a>
        ))}
      </div>
    </main>
  );
}


