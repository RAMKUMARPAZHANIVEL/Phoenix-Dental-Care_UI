"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const segmentLabels = {
  about: "About",
  services: "Services",
  team: "Team",
  contact: "Contact",
};

export default function Breadcrumb({ serviceNames = {} }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = [{ label: "Home", href: "/" }];

  segments.forEach((seg, i) => {
    const href = "/" + segments.slice(0, i + 1).join("/");
    const label = serviceNames[seg] || segmentLabels[seg] || seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    crumbs.push({ label, href });
  });

  if (crumbs.length < 2) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-500">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-1">
              {i > 0 && <span aria-hidden="true" className="text-gray-300">/</span>}
              {isLast ? (
                <span className="text-gray-800 font-medium" aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <Link href={crumb.href} className="hover:text-primary transition">
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
