import { getBlogPosts } from "app/blog/utils";

export const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://life-logged.vercel.app";

export default async function sitemap() {
  const blogPosts = await getBlogPosts();

  const blogs = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const routes = ["", "/blog"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
