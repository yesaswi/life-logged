import Link from "next/link";
import { ExternalLink } from "lucide-react";

const socialLinks = [
  {
    name: "RSS",
    href: "/rss",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/yesaswi_",
  },
  {
    name: "GitHub",
    href: "https://github.com/yesaswi",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/yesaswi",
  },
];

export default function Footer() {
  return (
    <footer className="py-6 border-t border-border mt-12">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div className="flex flex-wrap gap-6 mb-4 sm:mb-0 justify-center sm:justify-start">
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-sm text-foreground hover:underline"
            >
              <span className="flex items-center">
                {link.name}
                {link.href.startsWith("http") && (
                  <ExternalLink className="ml-1 h-3 w-3" />
                )}
              </span>
            </Link>
          ))}
        </div>
        <p className="text-sm text-foreground">
          © {new Date().getFullYear()} Life, Logged. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
