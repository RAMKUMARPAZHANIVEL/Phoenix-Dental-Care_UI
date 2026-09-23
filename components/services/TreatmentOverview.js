export default function TreatmentOverview({ description }) {
  if (!description) return null;
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Treatment</h2>
      <p className="text-lg text-gray-700 leading-relaxed">{description}</p>
    </section>
  );
}
