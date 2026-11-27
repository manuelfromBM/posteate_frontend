// All amounts are in CLP.
export type Price = { type: "fixed"; amount: number } | { type: "range"; min: number; max: number };
