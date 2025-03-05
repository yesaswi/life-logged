import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import { getDraftPosts } from "@/app/lib/db";
import { formatDate } from "@/app/blog/utils";

export const dynamic = "force-dynamic";

export const metadata = {
  title: 'Drafts',
  description: 'View and manage your unpublished drafts',
};

export default async function DraftsPage() {
  const session = await auth();
  
  // Redirect to login if not authenticated
  if (!session) {
    redirect('/login');
  }
  
  // Get drafts
  const drafts = await getDraftPosts();

  return (
    <section>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-semibold text-2xl tracking-tighter">Drafts</h1>
        <Link href="/blog/new" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          Create New Post
        </Link>
      </div>
      
      <div className="mb-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 dark:bg-yellow-900/20 dark:border-yellow-600">
        <p className="text-yellow-800 dark:text-yellow-200">
          These are your unpublished drafts. They are only visible to you when logged in.
        </p>
      </div>
      
      {drafts.length === 0 ? (
        <div className="mt-4 mb-8">
          <p className="text-neutral-600 dark:text-neutral-400">
            No drafts found. Start creating new content!
          </p>
        </div>
      ) : (
        <div>
          {drafts.map((post) => (
            <Link
              key={post.slug}
              className="flex flex-col space-y-1 mb-4"
              href={`/blog/${post.slug}`}
            >
              <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
                <p className="text-neutral-600 dark:text-neutral-400 w-[200px] tabular-nums">
                  {formatDate(post.published_at, false)}
                </p>
                <div className="flex items-center">
                  <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                    {post.title}
                  </p>
                  <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100 rounded-full">
                    Draft
                  </span>
                  <Link 
                    href={`/blog/edit/${post.slug}`} 
                    className="ml-2 text-xs text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                </div>
              </div>
              <div className="w-full">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {post.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
      
      <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
        <Link href="/blog" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200">
          ← Back to published posts
        </Link>
      </div>
    </section>
  );
} 