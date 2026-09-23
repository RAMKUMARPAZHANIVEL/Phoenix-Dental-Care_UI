export default function TreatmentProcedure({ procedureSteps }) {
  if (!procedureSteps || procedureSteps.length === 0) return null;
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Treatment Process</h2>
      <ol className="space-y-4">
        {procedureSteps.map((step) => (
          <li key={step.step} className="bg-white rounded-xl border p-5 flex gap-5 items-start hover:shadow-md transition">
            <span
              className="shrink-0 w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center text-sm"
              aria-hidden="true"
            >
              {step.step}
            </span>
            <div>
              <h3 className="font-semibold text-gray-800">{step.title}</h3>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
