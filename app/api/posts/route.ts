import { NextResponse } from "next/server";

import { getAllPosts, getPostBySlug } from "@/app/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const slug = searchParams.get("slug");

  if (slug) {
    const post = await getPostBySlug(slug);

    return NextResponse.json(post);
  } else {
    const posts = await getAllPosts();

    return NextResponse.json(posts);
  }
}
