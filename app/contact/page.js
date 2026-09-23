import { FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi";
import ContactForm from "../../components/ContactForm";
import Breadcrumb from "../../components/Breadcrumb";
import { practiceInfo } from "../utils/config";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Phoenix Dental Care in Chitlapakkam, Chennai. Call us or send a message to book your appointment.",
  openGraph: {
    title: "Contact Us | Phoenix Dental Care",
    description:
      "Get in touch with Phoenix Dental Care — call us or send a message to book your dental appointment.",
    url: "https://www.phoenixdentalcare.in/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="bg-[#F8F9FA] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Breadcrumb />

        <h1 className="text-4xl font-bold text-primary mb-2">Contact Us</h1>
        <p className="text-gray-600 mb-10">
          We&apos;d love to hear from you. Fill in the form and our team will get back to you to confirm your appointment.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left column: clinic info */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Clinic Information</h2>
              <div className="flex flex-col gap-4 text-gray-700">
                <div className="flex gap-3">
                  <FiMapPin className="text-primary mt-1 shrink-0" size={18} />
                  <span>{practiceInfo.address}</span>
                </div>
                <div className="flex gap-3 items-center">
                  <FiPhone className="text-primary shrink-0" size={18} />
                  <a href={`tel:${practiceInfo.phone.replace(/\s/g, "")}`} className="hover:text-primary transition">
                    {practiceInfo.phone}
                  </a>
                </div>
                <div className="flex gap-3 items-center">
                  <FiMail className="text-primary shrink-0" size={18} />
                  <a href={`mailto:${practiceInfo.email}`} className="hover:text-primary transition">
                    {practiceInfo.email}
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FiClock className="text-primary" size={18} /> Opening Hours
              </h2>
              <ul className="flex flex-col gap-2 text-gray-700">
                {practiceInfo.openingHours.map((line) => (
                  <li key={line} className="text-sm">{line}</li>
                ))}
              </ul>
            </div>

            <div className="bg-pink-50 rounded-2xl p-6">
              <p className="text-sm text-gray-600">
                <strong>Prefer WhatsApp?</strong> You can also reach us directly via WhatsApp for a quicker response.
              </p>
              <a
                href={`https://wa.me/${practiceInfo.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block bg-green-500 text-white px-5 py-2 rounded-xl text-sm hover:scale-105 transition"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Right column: contact form */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
