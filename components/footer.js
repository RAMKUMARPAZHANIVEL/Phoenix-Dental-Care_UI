import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiPhone, FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-4">
        
        {/* Brand */}
        <div className="md:col-span-1">
          <h2 className="text-xl font-semibold text-pink-500 mb-4">
            Phoenix Dental Care
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Gentle, advanced, and affordable dental care for confident smiles.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 text-gray-600">
            <FaFacebookF className="hover:text-pink-500 cursor-pointer transition" />
            <FaTwitter className="hover:text-pink-500 cursor-pointer transition" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer transition" />
            <FaLinkedinIn className="hover:text-pink-500 cursor-pointer transition" />
          </div>
        </div>

        {/* Company */}
        <div className="md:col-span-2">
          <h4 className="font-semibold mb-4">Clinic</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="#about" className="hover:text-primary transition">About Us</a>
            </li>
            <li>
              <a href="#treatments" className="hover:text-primary transition">Treatments</a>
            </li>
            <li>
              <a href="#contact" className="hover:text-primary transition">Contact</a>
            </li>
          </ul>
        </div>

        {/* Support */}
        {/* <div>
          <h4 className="font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="hover:text-pink-500 cursor-pointer">Help Center</li>
            <li className="hover:text-pink-500 cursor-pointer">Feedback</li>
            <li className="hover:text-pink-500 cursor-pointer">Contact</li>
            <li className="hover:text-pink-500 cursor-pointer">FAQs</li>
          </ul>
        </div> */}

        {/* Links */}
        {/* <div> */}
          {/* <h4 className="font-semibold mb-4">Links</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="hover:text-pink-500 cursor-pointer">Treatments</li>
            <li className="hover:text-pink-500 cursor-pointer">Doctors</li>
            <li className="hover:text-pink-500 cursor-pointer">Appointments</li>
            <li className="hover:text-pink-500 cursor-pointer">All in One</li>
          </ul> */}
        {/* </div> */}

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-4 ml-auto">Contact Us</h4>
          <div className="space-y-3 text-sm text-gray-600">
            {/* <p>Phoenix Dental Care, <br /> Anna Street, Chitlapakkam, <br /> Chennai - 600064</p> */}
            <div className="flex items-center gap-2">
              <FiPhone className="text-pink-500" />
              <span>+91 90032 26380</span>
            </div>
            <div className="flex items-center gap-2">
              <FiMail className="text-pink-500" />
              <span>phoenixdentalc@gmail.com</span>
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
            <span className="hover:text-pink-500 cursor-pointer">Legal</span>
            <span className="hover:text-pink-500 cursor-pointer">Site Map</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
