import Link from "next/link";

import { notFound } from "next/navigation";

import { getBlogPost, formatDate } from "../utils";

import { CustomMDX } from "app/components/mdx";

export const dynamic = "force-dynamic";

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-4 tracking-tighter">
        {post.metadata.title}
      </h1>

      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt, true)}
        </p>

        <Link href={`/blog/edit/${post.slug}`} className="text-blue-500">
          Edit Post
        </Link>
      </div>

      <article className="prose dark:prose-invert">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
