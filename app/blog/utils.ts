import { getAllPosts, getPostBySlug, getDraftPosts } from "../lib/db";
import { unstable_noStore as noStore } from "next/cache";
import { auth } from "../lib/auth";

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

  published: boolean;
};

export async function getBlogPosts(): Promise<BlogPost[]> {
  noStore(); // Prevent caching

  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,

    metadata: {
      title: post.title,

      publishedAt: formatDate(post.published_at),

      summary: post.summary,

      image: post.image,
    },

    content: post.content,

    published: post.published,
  }));
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  noStore(); // Prevent caching

  const post = await getPostBySlug(slug);

  if (!post) return null;
  
  // Check authentication for unpublished posts
  const session = await auth();
  
  // Don't return unpublished posts to unauthenticated users
  if (!post.published && !session) {
    return null;
  }

  return {
    slug: post.slug,

    metadata: {
      title: post.title,

      publishedAt: formatDate(post.published_at),

      summary: post.summary,

      image: post.image,
    },

    content: post.content,

    published: post.published,
  };
}

export function formatDate(date: string | Date, includeRelative = false) {
  let currentDate = new Date();
  let targetDate: Date;

  // Return the date string as-is if it's already in Month Day, Year format
  if (typeof date === "string") {
    // Check if the string matches Month Day, Year format (e.g., "February 24, 2025")
    const monthDayYearRegex = /^[A-Z][a-z]+ \d{1,2}, \d{4}$/;
    if (monthDayYearRegex.test(date)) {
      // It's already formatted, no need to process further unless relative time is needed
      if (!includeRelative) {
        return date;
      }
      // If relative time is needed, we must convert to Date object
      targetDate = new Date(date);
    } else {
      try {
        // For other string formats, attempt to parse as ISO date
        if (!date.includes("T") && !isNaN(Date.parse(date))) {
          // If it's a valid date string without time component, add time
          date = `${date}T00:00:00`;
        }
        
        targetDate = new Date(date);
        
        // Check if the resulting date is valid
        if (isNaN(targetDate.getTime())) {
          console.warn(`Invalid date string: ${date}`);
          targetDate = new Date(); // Fallback to current date
        }
      } catch (error) {
        console.error(`Error parsing date: ${date}`, error);
        targetDate = new Date(); // Fallback to current date
      }
    }
  } else if (date instanceof Date) {
    targetDate = date;
  } else {
    targetDate = new Date(); // Fallback to current date if invalid
  }

  // If the date is already a valid string in the right format and we don't need relative time
  if (typeof date === "string" && !includeRelative && /^[A-Z][a-z]+ \d{1,2}, \d{4}$/.test(date)) {
    return date;
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

export async function getDraftBlogPosts(): Promise<BlogPost[]> {
  noStore(); // Prevent caching
  
  // Only authenticated users can access drafts
  const session = await auth();
  if (!session) {
    return [];
  }

  const drafts = await getDraftPosts();

  return drafts.map((post) => ({
    slug: post.slug,
    metadata: {
      title: post.title,
      publishedAt: formatDate(post.published_at),
      summary: post.summary,
      image: post.image,
    },
    content: post.content,
    published: post.published,
  }));
}
