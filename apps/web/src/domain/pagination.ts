// Cursor-based pagination only, never offset (see docs/IA/architecture.md).
export interface Page<T> {
  items: T[];
  nextCursor: string | null;
}
