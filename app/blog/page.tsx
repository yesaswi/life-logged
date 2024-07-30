import { BlogPosts } from "app/components/posts";
import Link from "next/link";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Blog</h1>
      <BlogPosts />
      <Link href="/blog/new" className="text-neutral-900 dark:text-neutral-100">
        Create New Post
      </Link>
    </section>
  );
}
