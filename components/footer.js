import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { practiceInfo } from "../app/utils/config";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Team", href: "/team" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-4">

        {/* Brand */}
        <div className="md:col-span-1">
          <h2 className="text-xl font-semibold text-pink-500 mb-4">
            {practiceInfo.tagline}
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Gentle, advanced, and affordable dental care for confident smiles.
          </p>
          <div className="flex space-x-4 text-gray-600">
            <FaFacebookF className="hover:text-pink-500 cursor-pointer transition" />
            <FaTwitter className="hover:text-pink-500 cursor-pointer transition" />
            <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=ulrhf7o">
              <FaInstagram className="hover:text-pink-500 cursor-pointer transition" />
            </a>
            <FaLinkedinIn className="hover:text-pink-500 cursor-pointer transition" />
          </div>
        </div>

        {/* Navigation */}
        <div className="md:col-span-1">
          <h4 className="font-semibold mb-4">Clinic</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-primary transition">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services quick links */}
        <div className="md:col-span-1">
          <h4 className="font-semibold mb-4">Services</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link href="/services/preventive-dentistry" className="hover:text-primary transition">Preventive Dentistry</Link></li>
            <li><Link href="/services/cosmetic-dentistry" className="hover:text-primary transition">Cosmetic Dentistry</Link></li>
            <li><Link href="/services/orthodontics" className="hover:text-primary transition">Orthodontics</Link></li>
            <li><Link href="/services/root-canal-treatment" className="hover:text-primary transition">Root Canal Treatment</Link></li>
            <li><Link href="/services" className="hover:text-primary transition font-medium">View All →</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-4">Contact Us</h4>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex gap-2">
              <FiMapPin className="text-pink-500 mt-0.5 shrink-0" />
              <span>{practiceInfo.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiPhone className="text-pink-500 shrink-0" />
              <a href={`tel:${practiceInfo.phone.replace(/\s/g, "")}`} className="hover:text-primary transition">
                {practiceInfo.phone}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <FiMail className="text-pink-500 shrink-0" />
              <a href={`mailto:${practiceInfo.email}`} className="hover:text-primary transition">
                {practiceInfo.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Phoenix Dental Care. All rights reserved.</p>
          <div className="flex space-x-6 mt-2 md:mt-0">
            <span className="hover:text-pink-500 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-pink-500 cursor-pointer">Terms of Use</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
