"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { createPostAction } from "@/app/actions/createPost";

export default function NewPostPage() {
  const [title, setTitle] = useState("");

  const [slug, setSlug] = useState("");

  const [content, setContent] = useState("");

  const [summary, setSummary] = useState("");

  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    try {
      const result = await createPostAction(slug, title, content, summary);

      if (result.success) {
        router.push(`/blog/${result.slug}`);
      } else {
        setError(result.error || "An error occurred while creating the post.");
      }
    } catch (error) {
      console.error("Error creating post:", error);

      setError("An unexpected error occurred.");
    }
  };

  const generateSlug = (title: string) => {
    return title

      .toLowerCase()

      .replace(/[^a-z0-9]+/g, "-")

      .replace(/(^-|-$)+/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;

    setTitle(newTitle);

    setSlug(generateSlug(newTitle));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Title"
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        placeholder="Slug"
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
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Create Post
      </button>
    </form>
  );
}
