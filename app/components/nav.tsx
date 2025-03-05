import Link from "next/link";
import { auth } from "app/lib/auth";
import { Button } from "app/components/ui/button";

const navItems = {
  "/": {
    name: "Home",
  },
  "/blog": {
    name: "Blog",
  }
};

export async function Navbar() {
  const session = await auth();
  
  return (
    <nav className="mb-16 tracking-tight">
      <div className="flex flex-row items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          Life, Logged
        </Link>
        <div className="flex flex-row items-center space-x-4">
          <div className="flex flex-row space-x-0">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2"
                >
                  {name}
                </Link>
              );
            })}
          </div>
          <div>
            {session ? (
              <div className="flex items-center space-x-2">
                {session.user?.image && (
                  <img 
                    src={session.user.image} 
                    alt={session.user.name || "Profile"} 
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <form action={async () => {
                  "use server";
                  const { signOut } = await import("app/lib/auth");
                  await signOut();
                }}>
                  <Button className="hover:text-neutral-800 text-xs h-8 px-3 rounded-md" type="submit">
                    Sign out
                  </Button>
                </form>
              </div>
            ) : (
              <Link href="/login">
                <Button className="hover:text-neutral-800 text-xs h-8 px-3 rounded-md">
                  Sign in
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
