// Seeded PRNG (mulberry32) so the generated mock data is the same on every run.
export function createRandom(seed: number) {
  let state = seed >>> 0;

  const next = (): number => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const int = (min: number, max: number): number => Math.floor(next() * (max - min + 1)) + min;

  const pick = <T>(items: readonly T[]): T => {
    const item = items[Math.floor(next() * items.length)];
    if (item === undefined) throw new Error("Cannot pick from an empty list");
    return item;
  };

  const sample = <T>(items: readonly T[], size: number): T[] => {
    const pool = [...items];
    const result: T[] = [];
    while (result.length < size && pool.length > 0) {
      result.push(...pool.splice(Math.floor(next() * pool.length), 1));
    }
    return result;
  };

  const chance = (probability: number): boolean => next() < probability;

  return { next, int, pick, sample, chance };
}

export type Random = ReturnType<typeof createRandom>;
