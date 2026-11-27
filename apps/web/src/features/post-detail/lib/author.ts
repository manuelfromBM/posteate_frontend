import type { AccountType, Post } from "@/domain";

const accountTypeLabel: Record<AccountType, string> = {
  person: "Particular",
  business: "Negocio",
  organization: "Organización",
};

export const CURATED_LABEL = "Cargada por Posteate";

export interface AuthorInfo {
  name: string;
  detail: string;
  curated: boolean;
}

// Who published it. Curated posts are labeled as such (docs/IA/principles.md §11).
export function getAuthorInfo(post: Post): AuthorInfo {
  if (post.source === "curated" || !post.author) {
    return {
      name: CURATED_LABEL,
      detail: "El equipo de Posteate subió esta publicación en nombre de otra persona.",
      curated: true,
    };
  }
  return {
    name: post.author.displayName,
    detail: accountTypeLabel[post.author.accountType],
    curated: false,
  };
}
