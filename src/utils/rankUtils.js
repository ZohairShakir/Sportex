export const RANKS = [
  { name: "Bronze", min: 0 },
  { name: "Silver", min: 200 },
  { name: "Gold", min: 500 },
  { name: "Platinum", min: 900 },
  { name: "Diamond", min: 1400 },
  { name: "Elite", min: 2000 },
];

export function getRankFromXP(xp) {
  let rank = RANKS[0];

  for (let r of RANKS) {
    if (xp >= r.min) rank = r;
  }

  return rank.name;
}
