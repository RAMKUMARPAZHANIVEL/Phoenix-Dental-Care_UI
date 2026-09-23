import Link from "next/link";
import Image from "next/image";

export default function RelatedTreatments({ relatedSlugs, allTreatments }) {
  if (!relatedSlugs || relatedSlugs.length === 0) return null;

  const related = relatedSlugs
    .map((slug) => allTreatments.find((t) => t.slug === slug))
    .filter(Boolean);

  if (related.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Treatments</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {related.map((treatment) => (
          <Link
            key={treatment.slug}
            href={`/services/${treatment.slug}`}
            className="group bg-white rounded-xl border overflow-hidden hover:shadow-md transition"
          >
            <div className="relative h-36 w-full">
              <Image
                src={treatment.imageSrc}
                alt={treatment.heroAlt || treatment.name}
                fill
                className="object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 text-sm group-hover:text-primary transition">
                {treatment.name}
              </h3>
              {treatment.summary && (
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{treatment.summary}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
