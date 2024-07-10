"use server";

import { updatePost, deletePost } from "@/app/lib/db";

export async function editPostAction(
  slug: string,

  title: string,

  content: string,

  summary: string,

  published: boolean,
) {
  try {
    const updatedSlug = await updatePost(
      slug,
      title,
      content,
      summary,
      published,
    );

    return { success: true, slug: updatedSlug };
  } catch (error) {
    console.error("Error updating post:", error);

    return { success: false, error: error.message };
  }
}

export async function deletePostAction(slug: string) {
  try {
    await deletePost(slug);

    return { success: true };
  } catch (error) {
    console.error("Error deleting post:", error);

    return { success: false, error: error.message };
  }
}
