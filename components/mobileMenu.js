"use client";

import { useState } from "react";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "About", href: "#about" },
    { name: "Doctors", href: "#doctors" },
    { name: "Treatments", href: "#treatments" },
    { name: "Why Choose Us", href: "#why-us" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden p-2 rounded-md border"
        aria-label="Open menu"
      >
        <div className="space-y-1">
          <span className="block h-0.5 w-6 bg-black" />
          <span className="block h-0.5 w-6 bg-black" />
          <span className="block h-0.5 w-6 bg-black" />
        </div>
      </button>

      {/* Menu + Overlay (mounted ONLY when open) */}
      {open && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 h-[100vh] bg-black/40 z-40"
            onClick={() => setOpen(false)}
          />

          {/* Side Menu */}
          <aside
            className="fixed top-0 right-0 w-72 bg-white z-50 p-3 rounded-sm
                       animate-slide-in"
          >
            <div className="p-4 flex justify-between items-center border-b">
              <h3 className="text-lg font-semibold">Menu</h3>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>

            <nav className="flex flex-col p-4 gap-4">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium hover:text-primary p-2 border-b "
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </aside>
        </>
      )}
    </>
  );
}