import { Suspense } from 'react';
import { BlogPosts } from "app/components/posts";
import { AuthActions } from "app/components/blog-auth-actions";

export const metadata = {
  title: 'Blog',
  description: 'Read my thoughts on programming, life, and more.',
};

export const dynamic = "force-dynamic";

export default function BlogPage() {
  return (
    <section>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-semibold text-2xl tracking-tighter">My Blog</h1>
        <Suspense fallback={null}>
          <AuthActions />
        </Suspense>
      </div>
      
      <BlogPosts />
    </section>
  );
}
