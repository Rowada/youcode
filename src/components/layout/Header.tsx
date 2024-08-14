import { Config } from "@/lib/config";
import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle";
import Image from "next/image";
import { Typography } from "../ui/Typography";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex items-center gap-2">
          <Image
            src="/images/you-code.svg"
            width={50}
            height={35}
            alt="app logo"
          />
          <Typography variant="h3" as={Link} href="/">
            {Config.title}
          </Typography>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
