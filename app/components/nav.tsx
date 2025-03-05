import Link from "next/link";
import { auth } from "app/lib/auth";
import { Button } from "app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "app/components/ui/dropdown-menu";

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
    <nav className="py-6 border-b border-border mb-6">
      <div className="flex justify-between items-center">
        <Link href="/" className="font-bold text-xl tracking-tight">
          Life, Logged
        </Link>
        <div className="flex items-center space-x-8">
          <div className="flex space-x-6">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="text-sm text-foreground hover:underline transition-all"
                >
                  {name}
                </Link>
              );
            })}
            {/* Show drafts link only for authenticated users */}
            {session && (
              <Link
                href="/drafts"
                className="text-sm text-foreground hover:underline transition-all"
              >
                <span className="flex items-center">
                  Drafts
                  <span className="ml-1 w-2 h-2 rounded-full bg-yellow-500"></span>
                </span>
              </Link>
            )}
          </div>
          <div>
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-sm font-normal">
                    Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40 rounded-none">
                  <form action={async () => {
                    "use server";
                    const { signOut } = await import("app/lib/auth");
                    await signOut({ redirectTo: "/" });
                  }}>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start rounded-none text-sm font-normal h-auto py-2 px-4" 
                      type="submit"
                    >
                      Sign out
                    </Button>
                  </form>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="default" size="sm">
                <Link href="/login">
                  Sign in
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
