"use client";

import Link from "next/link";
import { useSession } from "@/app/components/auth-provider";

export function AuthActions() {
  const session = useSession();
  
  if (!session) {
    return null;
  }

  return (
    <div className="space-x-2">
      <Link 
        href="/drafts" 
        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
      >
        View Drafts
      </Link>
      <Link 
        href="/blog/new" 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Create New Post
      </Link>
    </div>
  );
} 