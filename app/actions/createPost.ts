"use server";

import { createPost } from "@/app/lib/db";

export async function createPostAction(
  slug: string,

  title: string,

  content: string,

  summary: string,
) {
  try {
    const newSlug = await createPost(slug, title, content, summary);

    return { success: true, slug: newSlug };
  } catch (error) {
    console.error("Error creating post:", error);

    return { success: false, error: error.message };
  }
}
