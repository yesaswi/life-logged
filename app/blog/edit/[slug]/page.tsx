"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { editPostAction, deletePostAction } from "@/app/actions/editPost";
import { useSession } from "@/app/components/auth-provider";

export default function EditPostPage({ params }: { params: { slug: string } }) {
  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const [summary, setSummary] = useState("");

  const [published, setPublished] = useState(false);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const session = useSession();

  useEffect(() => {
    if (session === null) {
      router.push('/login');
      return;
    }

    async function fetchPost() {
      try {
        setLoading(true);
        const response = await fetch(`/api/posts?slug=${params.slug}`);

        if (!response.ok) throw new Error("Failed to fetch post");

        const post = await response.json();

        if (post) {
          setTitle(post.title);

          setContent(post.content);

          setSummary(post.summary);

          setPublished(post.published);
          
          if (!post.published) {
            // Allow editing unpublished posts, but make it clear they're unpublished
            // If you want to completely block editing, uncomment the next line:
            // router.push('/blog');
          }
        } else {
          setError("Post not found");
          router.push('/blog');
        }
      } catch (error) {
        console.error("Error fetching post:", error);

        setError("Failed to load post. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [params.slug, session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    const result = await editPostAction(
      params.slug,

      title,

      content,

      summary,

      published,
    );

    if (result.success) {
      router.push(`/blog/${result.slug}`);
    } else {
      setError(result.error || "An error occurred while updating the post.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const result = await deletePostAction(params.slug);

      if (result.success) {
        router.push("/blog");
      } else {
        setError(result.error || "An error occurred while deleting the post.");
      }
    }
  };

  if (loading) {
    return <div>Loading post...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      {!published && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <p>This post is currently unpublished. It will not be visible to others until published.</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
          className="w-full h-64 p-2 border rounded"
        />
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Summary"
          required
          className="w-full p-2 border rounded"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          <span>Published</span>
        </label>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Update Post
        </button>
      </form>
      <button
        onClick={handleDelete}
        className="mt-4 bg-red-500 text-white p-2 rounded"
      >
        Delete Post
      </button>
    </div>
  );
}
