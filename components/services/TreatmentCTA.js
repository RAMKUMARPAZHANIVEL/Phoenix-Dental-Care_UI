import Link from "next/link";

export default function TreatmentCTA({ treatmentName }) {
  return (
    <section className="mb-12">
      <div className="bg-pink-50 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
          {treatmentName ? `Ready to Book Your ${treatmentName}?` : "Ready to Get Started?"}
        </h2>
        <p className="text-gray-600 mb-6 max-w-lg mx-auto">
          Book an appointment with Dr. Divya and take the first step toward a healthier, more confident smile.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-primary text-white px-8 py-3 rounded-xl shadow hover:scale-105 transition font-medium"
        >
          Book an Appointment
        </Link>
      </div>
    </section>
  );
}
