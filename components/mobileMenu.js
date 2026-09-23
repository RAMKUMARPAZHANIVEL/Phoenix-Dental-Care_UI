"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Team", href: "/team" },
  { name: "Contact", href: "/contact" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const close = () => setOpen(false);

  useEffect(() => {
    close();
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden p-2 rounded-md border"
        aria-label="Open menu"
        aria-expanded={open}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={close}
            aria-hidden="true"
          />

          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed top-0 right-0 h-full w-72 bg-white z-50 p-3 rounded-sm animate-slide-in"
          >
            <div className="p-4 flex justify-between items-center border-b">
              <h3 className="text-lg font-semibold">Menu</h3>
              <button onClick={close} aria-label="Close menu">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col p-4 gap-4">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={close}
                  className={`text-lg font-medium hover:text-primary p-2 border-b ${
                    pathname === link.href ? "text-primary" : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="px-4 mt-2">
              <Link
                href="/contact"
                onClick={close}
                className="block text-center bg-primary text-white px-6 py-3 rounded-xl shadow hover:scale-105 transition font-medium"
              >
                Book Appointment
              </Link>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
