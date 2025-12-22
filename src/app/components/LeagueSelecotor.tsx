"use client";

import { useRouter } from "next/navigation";

const LEAGUES = [
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

export default function LeagueSelector({
  currentLeague,
}: {
  currentLeague: string;
}) {
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const leagueCode = e.target.value;
    router.push(`/standings/${leagueCode}`);
  }

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-600 mb-1">
        League
      </label>

      <select
        value={currentLeague}
        onChange={handleChange}
        className="w-full max-w-xs border border-gray-300 rounded-md px-3 py-2 bg-white"
      >
        {LEAGUES.map((league) => (
          <option key={league.code} value={league.code}>
            {league.name}
          </option>
        ))}
      </select>
    </div>
  );
}
