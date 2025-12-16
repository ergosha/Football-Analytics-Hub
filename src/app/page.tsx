const leagues = [
  { code: "PL", name: "Premier League" },
  { code: "PD", name: "La Liga" },
  { code: "BL1", name: "Bundesliga" },
  { code: "SA", name: "Serie A" },
  { code: "FL1", name: "Ligue 1" },
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      {leagues.map((league) => (
        <a
          key={league.code}
          href={`/standings/${league.code}`}
          className="text-blue-600 underline text-lg"
        >
          {league.name}
        </a>
      ))}
    </main>
  );
}


