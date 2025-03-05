import Link from "next/link";
import { formatDate, getBlogPosts } from "app/blog/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export async function BlogPosts() {
  const allBlogs = await getBlogPosts();

  return (
    <div className="grid gap-4">
      {allBlogs
        .sort(
          (a, b) =>
            new Date(b.metadata.publishedAt).getTime() -
            new Date(a.metadata.publishedAt).getTime(),
        )
        .map((post) => (
          <Card key={post.slug} className="group">
            <Link href={`/blog/${post.slug}`} className="block h-full">
              <CardHeader className="pb-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <CardTitle className="text-lg group-hover:underline transition-all">
                    {post.metadata.title}
                  </CardTitle>
                  <time 
                    dateTime={post.metadata.publishedAt} 
                    className="text-sm tabular-nums"
                  >
                    {formatDate(post.metadata.publishedAt, false)}
                  </time>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {post.metadata.summary}
                </CardDescription>
              </CardContent>
            </Link>
          </Card>
        ))}
    </div>
  );
}
