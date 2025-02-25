import Link from "next/link";

const navItems = {
  "/": {
    name: "Home",
  },
  "/blog": {
    name: "Blog",
  }
};

export function Navbar() {
  return (
    <nav className="mb-16 tracking-tight">
      <div className="flex flex-row items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          Life, Logged
        </Link>
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
      </div>
    </nav>
  );
}
