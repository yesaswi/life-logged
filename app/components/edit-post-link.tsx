"use client";

import Link from "next/link";
import { useSession } from "./auth-provider";

export default function EditPostLink({ slug }: { slug: string }) {
  const session = useSession();
  
  if (!session) {
    return null;
  }
  
  return (
    <Link href={`/blog/edit/${slug}`} className="text-blue-500">
      Edit Post
    </Link>
  );
} 