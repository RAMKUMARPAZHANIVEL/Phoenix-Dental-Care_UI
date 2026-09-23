import Image from "next/image";
import OurDoctor from "../components/home/ourDoctor";
import WhyChooseUs from "../components/home/whyChooseUs";
import { FiPhone, FiMail } from "react-icons/fi";
import Offers from "../components/home/offers";
import Stats from "../components/Stats";
import MapRedirect from "../components/home/map";
import TestimonialSlider from "../components/home/testimonialSlider";
import TreatmentHero from "../components/home/treatmentsHero";
import FadeUp from "./utils/animations/FadeUp";
import Treatments from "../components/home/treatments";
import Link from "next/link";
import JsonLd from "../components/seo/JsonLd";
import { practiceInfo, whatsappUrl } from "./utils/config";

export const metadata = {
  title: "Phoenix Dental Care — Chitlapakkam, Chennai",
  description:
    "Dr. Divya's Phoenix Dental Care in Chitlapakkam, Chennai — gentle, advanced, and affordable dental care for all ages. Book your appointment today.",
  openGraph: {
    title: "Phoenix Dental Care — Chitlapakkam, Chennai",
    description:
      "Dr. Divya's Phoenix Dental Care in Chitlapakkam, Chennai — gentle, advanced, and affordable dental care for all ages.",
    url: "https://www.phoenixdentalcare.in",
  },
};

const dentistJsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: practiceInfo.name,
  description:
    "Gentle, advanced, and affordable dental care for all ages in Chitlapakkam, Chennai.",
  url: "https://www.phoenixdentalcare.in",
  telephone: practiceInfo.phone,
  email: practiceInfo.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "No 58/60, Ground Floor, Anna Street",
    addressLocality: "Chitlapakkam",
    addressRegion: "Tamil Nadu",
    postalCode: "600064",
    addressCountry: "IN",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "20:00",
    },
  ],
};

export default function Home() {
  return (
    <main className="bg-[#F8F9FA]">
      <JsonLd data={dentistJsonLd} />

      <div className="relative overflow-hidden">
        {/* Floating Icons */}
        <span className="bg-icon top-10 right-10">🦷</span>
        <span className="bg-icon top-[50%] right-10">✨</span>
        <span className="bg-icon bottom-20 left-16">➕</span>

        <div className="relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col p-6 lg:p-0 md:gap-10 gap-20">

            <section className="max-w-7xl mx-auto md:px-20 md:py-10 grid md:grid-cols-2 gap-10 items-center">
              <FadeUp delay={0.3}>
                <div className="animate-fadeIn">
                  <h1 className="text-4xl font-bold mb-4">
                    Rejuvenating Smiles...
                  </h1>
                  <p className="mb-6 text-lg">
                    Start your smile journey with us — book your appointment and discover the Phoenix Dental Care difference.
                  </p>
                  <Link
                    href="/contact"
                    className="w-fit inline-block bg-primary text-white px-6 py-3 rounded-xl shadow hover:scale-105 transition"
                  >
                    Book Appointment
                  </Link>
                </div>
              </FadeUp>
              <TreatmentHero />
            </section>

            {/* <FadeUp delay={0.2}>
              <section className="bg-pink-50 md:py-20">
                <div className="max-w-5xl mx-auto px-1 md:px-6 text-center">
                  <h2 className="text-3xl font-bold text-primary mb-10">About Us</h2>
                  <p className="text-lg text-[#000] text-left">
                    Dr. Divya's Phoenix Dental Care is your trusted neighborhood dental clinic in Chitlapakkam, Chennai, dedicated to providing gentle, advanced, and affordable dental care for all ages.
                    Led by Dr. Divya, we focus mainly on painless dentistry, combining modern technology with compassionate care to ensure every patient feels comfortable and relaxed.
                    From preventive and restorative treatments to cosmetic and pediatric dentistry, we provide personalized solutions to help you achieve a healthy, confident smile.
                  </p>
                </div>
              </section>
            </FadeUp> */}

            <FadeUp delay={0.3}>
              <OurDoctor />
            </FadeUp>

            <Treatments />

            {/* <FadeUp delay={0.3}>
              <WhyChooseUs />
            </FadeUp> */}

            <FadeUp delay={0.3}>
              <TestimonialSlider />
            </FadeUp>

            <FadeUp delay={0.3}>
              <Offers />
            </FadeUp>

            <Stats />

            <FadeUp delay={0.3}>
              <MapRedirect />
            </FadeUp>

            <div className="mx-auto">
              <a
                href="https://search.google.com/local/writereview?placeid=ChIJiV6ivnRfUjoRQmSXsFhprSk&source=g.page.m.dc._&laa=gpay-review-qr-tab-downloaded-card"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  height={400}
                  width={600}
                  className="rounded-2xl cursor-pointer"
                  src="/images/rate_us.jpeg"
                  alt="Rate us"
                />
              </a>
            </div>

            <FadeUp delay={0.3}>
              <section className="bg-pink-50 py-0 lg:py-20">
                <div className="max-w-5xl mx-auto px-6 text-center">
                  <h2 className="text-3xl font-semibold text-primary mb-4">Contact Us</h2>
                  <p className="mb-4">
                    DR DIVYA.S, B.D.S, M.D.S., <br />
                    Family Dental Surgeon, Aesthetician, Adult and Children&apos;s Dentist <br />
                    Associate Professor in Dental College <br />
                    No 58/60, Ground Floor, Anna Street, Chitlapakkam, Chennai - 600064
                  </p>
                  <div className="flex items-center gap-2 w-fit mx-auto">
                    <FiPhone className="text-pink-500" />
                    <span>{practiceInfo.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 w-fit mx-auto mt-1">
                    <FiMail className="text-pink-500" />
                    <span>{practiceInfo.email}</span>
                  </div>
                  <div className="mt-6">
                    <Link
                      href="/contact"
                      className="inline-block bg-primary text-white px-6 py-3 rounded-xl shadow hover:scale-105 transition"
                    >
                      Send Us a Message
                    </Link>
                  </div>
                </div>
              </section>
            </FadeUp>

          </div>
        </div>
      </div>
    </main>
  );
}
