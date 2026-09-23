"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import MobileMenu from "./mobileMenu";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Team", href: "/team" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <Link href="/" className="flex gap-3 items-center">
          <Image src="/images/Logo.jpeg" alt="Phoenix Dental Care logo" width={48} height={48} className="w-12 h-12 object-contain" />
          <span className="text-xl font-bold text-primary">Dr Divya's Phoenix Dental Care</span>
        </Link>

        <nav className="space-x-6 hidden md:flex items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-primary transition font-medium ${
                pathname === link.href ? "text-primary" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-primary text-white px-4 py-2 rounded-xl shadow hover:scale-105 transition font-medium"
          >
            Book Appointment
          </Link>
        </nav>

        <MobileMenu />
      </div>
    </header>
  );
}
