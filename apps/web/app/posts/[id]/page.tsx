import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  buildPostMetadata,
  getPost,
  getPostDetailData,
  PostDetailPage,
} from "@/features/post-detail";

export async function generateMetadata({ params }: PageProps<"/posts/[id]">): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);
  return post ? buildPostMetadata(post) : { title: "Publicación no encontrada" };
}

export default async function Page({ params }: PageProps<"/posts/[id]">) {
  const { id } = await params;
  const data = await getPostDetailData(id);
  if (!data) notFound();
  return <PostDetailPage data={data} />;
}
