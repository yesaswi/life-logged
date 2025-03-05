import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function getAllPosts() {
  const { rows } = await sql`
    SELECT slug, title, summary, published_at, content
    FROM posts
    WHERE published = true
    ORDER BY published_at DESC
  `;
  revalidatePath("/blog");
  return rows;
}

export async function getPostBySlug(slug: string) {
  const { rows } = await sql`
    SELECT *
    FROM posts
    WHERE slug = ${slug}
  `;
  return rows[0];
}

export async function createPost(
  slug: string,
  title: string,
  content: string,
  summary: string,
) {
  const { rows } = await sql`
    INSERT INTO posts (slug, title, content, summary, published_at, published)
    VALUES (${slug}, ${title}, ${content}, ${summary}, CURRENT_TIMESTAMP, true)
    RETURNING slug
  `;
  revalidatePath("/blog");
  return rows[0].slug;
}

export async function updatePost(
  slug: string,
  title: string,
  content: string,
  summary: string,
  published: boolean,
) {
  const { rows } = await sql`
    UPDATE posts
    SET title = ${title}, content = ${content}, summary = ${summary},
        published = ${published},
        updated_at = CURRENT_TIMESTAMP
    WHERE slug = ${slug}
    RETURNING slug
  `;
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/blog");
  return rows[0].slug;
}

export async function deletePost(slug: string) {
  await sql`
    DELETE FROM posts
    WHERE slug = ${slug}
  `;
  revalidatePath("/blog");
}

export async function getDraftPosts() {
  const { rows } = await sql`
    SELECT slug, title, summary, published_at, content
    FROM posts
    WHERE published = false
    ORDER BY published_at DESC
  `;
  revalidatePath("/drafts");
  return rows;
}
