import Link from "next/link";
import Breadcrumb from "../../components/Breadcrumb";
import WhyChooseUs from "../../components/home/whyChooseUs";
import Stats from "../../components/Stats";
import { practiceInfo } from "../utils/config";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Dr. Divya's Phoenix Dental Care — a trusted dental clinic in Chitlapakkam, Chennai, committed to gentle, advanced, and affordable dental care for all ages.",
  openGraph: {
    title: "About Us | Phoenix Dental Care",
    description:
      "Learn about Dr. Divya's Phoenix Dental Care — a trusted dental clinic in Chitlapakkam, Chennai.",
    url: "https://www.phoenixdentalcare.in/about",
  },
};

export default function AboutPage() {
  return (
    <main className="bg-[#F8F9FA] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Breadcrumb />

        <h1 className="text-4xl font-bold text-primary mb-6">About Phoenix Dental Care</h1>

        {/* Practice Story */}
        <section className="bg-pink-50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Dr. Divya&apos;s Phoenix Dental Care is your trusted neighborhood dental clinic in Chitlapakkam, Chennai,
            dedicated to providing gentle, advanced, and affordable dental care for all ages.
            Led by Dr. Divya, we focus mainly on painless dentistry, combining modern technology with
            compassionate care to ensure every patient feels comfortable and relaxed.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            From preventive and restorative treatments to cosmetic and pediatric dentistry, we provide
            personalized solutions to help you achieve a healthy, confident smile. Every patient is
            treated like family, and every smile receives the attention it truly deserves.
          </p>
        </section>

        {/* Values */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Gentle Care", text: "We prioritize your comfort in every procedure, using modern techniques to minimize pain and anxiety." },
              { title: "Advanced Technology", text: "Equipped with the latest dental technology to deliver precise, effective, and lasting results." },
              { title: "Compassion First", text: "We listen to your concerns, respect your time, and design treatment plans around your unique needs." },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-xl p-6 border">
                <h3 className="font-semibold text-primary mb-2">{v.title}</h3>
                <p className="text-sm text-gray-600">{v.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="mb-12">
          <Stats />
        </section>

        {/* Why Choose Us */}
        <section className="mb-12">
          <WhyChooseUs />
        </section>

        {/* Location */}
        <section className="bg-white rounded-2xl p-8 border mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Find Us</h2>
          <div className="grid md:grid-cols-2 gap-6">
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
            <div className="flex items-center">
              <Link
                href="/contact"
                className="inline-block bg-primary text-white px-8 py-3 rounded-xl shadow hover:scale-105 transition font-medium"
              >
                Book an Appointment
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
