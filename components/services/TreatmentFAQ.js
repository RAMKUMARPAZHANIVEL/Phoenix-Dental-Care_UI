export default function TreatmentFAQ({ faqs }) {
  if (!faqs || faqs.length === 0) return null;
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="bg-white rounded-xl border group open:shadow-md transition"
          >
            <summary className="flex justify-between items-center cursor-pointer px-5 py-4 font-semibold text-gray-800 list-none select-none">
              {faq.question}
              <span
                className="ml-4 shrink-0 w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 group-open:rotate-45 transition-transform"
                aria-hidden="true"
              >
                +
              </span>
            </summary>
            <p className="px-5 pb-5 text-gray-600 leading-relaxed text-sm">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
