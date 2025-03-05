import { NextResponse } from "next/server";
import { getAllPosts, getPostBySlug } from "@/app/lib/db";
import { auth } from "@/app/lib/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const session = await auth();
  
  if (slug) {
    const post = await getPostBySlug(slug);
    
    // If post doesn't exist, return 404
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    
    // If post is not published and user is not authenticated, return 403
    if (!post.published && !session) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }
    
    return NextResponse.json(post);
  } else {
    // For listing all posts, we'll continue using getAllPosts which already filters for published=true
    const posts = await getAllPosts();
    return NextResponse.json(posts);
  }
}
