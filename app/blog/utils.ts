import { getAllPosts, getPostBySlug } from "@/app/lib/db";

import { unstable_noStore as noStore } from "next/cache";

export type Metadata = {
  title: string;

  publishedAt: string;

  summary: string;

  image?: string;
};

export type BlogPost = {
  slug: string;

  metadata: Metadata;

  content: string;
};

export async function getBlogPosts(): Promise<BlogPost[]> {
  noStore(); // Prevent caching

  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,

    metadata: {
      title: post.title,

      publishedAt: post.published_at.toISOString(),

      summary: post.summary,

      image: post.image,
    },

    content: post.content,
  }));
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  noStore(); // Prevent caching

  const post = await getPostBySlug(slug);

  if (!post) return null;

  return {
    slug: post.slug,

    metadata: {
      title: post.title,

      publishedAt: post.published_at.toISOString(),

      summary: post.summary,

      image: post.image,
    },

    content: post.content,
  };
}

export function formatDate(date: string | Date, includeRelative = false) {
  let currentDate = new Date();

  let targetDate: Date;

  if (typeof date === "string") {
    if (!date.includes("T")) {
      date = `${date}T00:00:00`;
    }

    targetDate = new Date(date);
  } else if (date instanceof Date) {
    targetDate = date;
  } else {
    throw new Error("Invalid date format");
  }

  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",

    month: "long",

    day: "numeric",
  });

  const formattedDate = formatter.format(targetDate);

  if (includeRelative) {
    const timeDifference = currentDate.getTime() - targetDate.getTime();

    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

    if (daysDifference === 0) {
      return `Today (${formattedDate})`;
    } else if (daysDifference === 1) {
      return `Yesterday (${formattedDate})`;
    } else if (daysDifference > 1 && daysDifference <= 30) {
      return `${daysDifference} days ago (${formattedDate})`;
    } else if (daysDifference > 30 && daysDifference <= 365) {
      const monthsAgo = Math.floor(daysDifference / 30);

      return `${monthsAgo} month${monthsAgo > 1 ? "s" : ""} ago (${formattedDate})`;
    } else {
      const yearsAgo = Math.floor(daysDifference / 365);

      return `${yearsAgo} year${yearsAgo > 1 ? "s" : ""} ago (${formattedDate})`;
    }
  }

  return formattedDate;
}
