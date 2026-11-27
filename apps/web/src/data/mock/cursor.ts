import type { RankKey } from "./ranking";

// Cursors are opaque to the UI. The mock encodes the last item's rank key.
export const encodeCursor = (key: RankKey): string =>
  Buffer.from(JSON.stringify(key)).toString("base64url");

export function decodeCursor(cursor: string): RankKey | null {
  try {
    const value: unknown = JSON.parse(Buffer.from(cursor, "base64url").toString("utf8"));
    if (
      typeof value === "object" &&
      value !== null &&
      "score" in value &&
      typeof value.score === "number" &&
      "publishedAt" in value &&
      typeof value.publishedAt === "string" &&
      "id" in value &&
      typeof value.id === "string"
    ) {
      return {
        score: value.score,
        publishedAt: value.publishedAt,
        id: value.id,
      };
    }
    return null;
  } catch {
    return null;
  }
}
