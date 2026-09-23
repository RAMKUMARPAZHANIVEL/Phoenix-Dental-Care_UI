import { FiCheckCircle } from "react-icons/fi";

export default function TreatmentBenefits({ benefits }) {
  if (!benefits || benefits.length === 0) return null;
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Benefits</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {benefits.map((benefit, i) => (
          <div key={i} className="bg-white rounded-xl border p-5 flex gap-4 items-start hover:shadow-md transition">
            <FiCheckCircle className="text-primary mt-0.5 shrink-0 text-xl" aria-hidden="true" />
            <div>
              <p className="font-semibold text-gray-800">{benefit.title}</p>
              {benefit.description && (
                <p className="text-sm text-gray-600 mt-1">{benefit.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
