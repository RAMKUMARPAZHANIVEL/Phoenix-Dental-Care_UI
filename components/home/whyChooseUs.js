"use client";

// import { ArrowRight } from "lucide-react";

const reasons = [
  {
    title: "Trusted Experience",
    text: "Successfully completed 1000+ dental treatments with consistent patient satisfaction.",
    accent: "bg-pink-100",
  },
  {
    title: "Comprehensive Dental Care",
    text: "From preventive check-ups to advanced cosmetic and pediatric dentistry — all under one roof.",
    accent: "bg-pink-200",
  },
  {
    title: "Modern Technology",
    text: "Equipped with the latest dental equipment for painless and precise treatments.",
    accent: "bg-pink-100",
  },
  {
    title: "Experienced Team",
    text: "Led by Dr. Divya, a skilled and compassionate dentist committed to excellence in every procedure.",
    accent: "bg-pink-200",
  },
  {
    title: "Hygiene & Safety First",
    text: "We maintain strict sterilization protocols for a safe and comfortable environment.",
    accent: "bg-pink-100",
  },
  {
    title: "Patient-Centered Approach",
    text: "We listen, we care, and we design treatment plans tailored to your needs.",
    accent: "bg-pink-200",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-3">
          
          {/* Left Content */}
          <div>
            <h2 className="text-3xl font-semibold text-slate-800">
              Why Choose Us
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              At <span className="font-medium text-slate-800">
                Dr. Divya’s Phoenix Dental Care
              </span>, we believe every smile deserves gentle, personalized, and
              high-quality care.
            </p>

            <button className="mt-6 rounded-md bg-pink-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-pink-600">
              Book Appointment
            </button>
          </div>

          {/* Cards */}
          <div className="lg:col-span-2 grid gap-6 sm:grid-cols-2">
            {reasons.map((item, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md`}
              >
                {/* Brush Accent */}
                <div
                  className={`absolute inset-0 -z-10 ${item.accent} opacity-60 clip-brush`}
                />

                <h3 className="text-lg font-semibold text-slate-800">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {item.text}
                </p>

                <div className="mt-5 flex justify-end">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-100 text-slate-700 transition hover:bg-pink-500 hover:text-white">
                    {/* <ArrowRight size={18} /> */}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
