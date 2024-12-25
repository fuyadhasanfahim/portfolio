import Button from "@/components/Button";
import Link from "next/link";

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const navItems = [
  {
    label: "About",
    href: "#intro",
  },
  {
    label: "Selected Works",
    href: "#projects",
  },
  {
    label: "Testimonials",
    href: "#testimonials",
  },
  {
    label: "FAQs",
    href: "#faqs",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

export default async function Header() {
  return (
    <header className="fixed top-0 left-0 w-full backdrop-blur-md">
      <div className="container !max-w-full">
        <div className="flex justify-between h-20 items-center">
          <div>
            <Link href={`/`}>
              <span className="text-xl font-bold uppercase">
                Fuyad Hasan Fahim
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="size-11 border bg-stone-200 border-stone-400 rounded-full inline-flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="3" y="15" width="18" height="2" fill="currentColor" />
                <rect x="3" y="7" width="18" height="2" fill="currentColor" />
              </svg>
            </div>

            <Button
              variant="primary"
              className=" hidden md:inline-flex items-center"
            >
              Contact Me
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
