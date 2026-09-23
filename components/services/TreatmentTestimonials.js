import { testimonials } from "../../app/utils/config";

export default function TreatmentTestimonials() {
  if (!testimonials || testimonials.length === 0) return null;
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">What Our Patients Say</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-white rounded-xl border p-6 flex flex-col gap-3">
            <p className="text-gray-700 leading-relaxed text-sm flex-1">
              &ldquo;{t.review}&rdquo;
            </p>
            <div>
              <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
              <p className="text-xs text-primary">{t.treatment}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
