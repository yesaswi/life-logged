"use client";

import Link from "next/link";
import { useSession } from "./auth-provider";
import { useState } from "react";
import { editPostAction } from "@/app/actions/editPost";

interface EditPostLinkProps {
  slug: string;
  published?: boolean;
  title?: string;
  content?: string;
  summary?: string;
}

export default function EditPostLink({ 
  slug, 
  published = true,
  title = "",
  content = "",
  summary = "" 
}: EditPostLinkProps) {
  const session = useSession();
  const [publishing, setPublishing] = useState(false);
  
  if (!session) {
    return null;
  }
  
  const handlePublish = async () => {
    if (!published) {
      if (confirm("Are you sure you want to publish this draft?")) {
        setPublishing(true);
        try {
          await editPostAction(slug, title, content, summary, true);
          window.location.reload();
        } catch (error) {
          console.error("Error publishing:", error);
          alert("Failed to publish post");
        } finally {
          setPublishing(false);
        }
      }
    }
  };
  
  return (
    <div className="flex items-center space-x-2">
      {!published && (
        <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100 rounded-full">
          Draft
        </span>
      )}
      <Link href={`/blog/edit/${slug}`} className="text-blue-500 hover:underline">
        Edit
      </Link>
      {!published && (
        <button 
          onClick={handlePublish}
          disabled={publishing}
          className="text-xs px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-green-300"
        >
          {publishing ? "Publishing..." : "Publish Now"}
        </button>
      )}
    </div>
  );
} 