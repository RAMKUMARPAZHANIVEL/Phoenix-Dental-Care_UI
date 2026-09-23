import Image from "next/image";

export default function TreatmentGallery({ beforeAfterImages }) {
  if (!beforeAfterImages || beforeAfterImages.length === 0) return null;
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Before &amp; After</h2>
      <div className="grid sm:grid-cols-2 gap-6">
        {beforeAfterImages.map((pair, i) => (
          <div key={i} className="rounded-xl overflow-hidden border bg-white">
            <div className="grid grid-cols-2">
              <div className="relative h-48">
                <Image
                  src={pair.before}
                  alt={pair.beforeAlt || "Before treatment"}
                  fill
                  className="object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded">
                  Before
                </span>
              </div>
              <div className="relative h-48">
                <Image
                  src={pair.after}
                  alt={pair.afterAlt || "After treatment"}
                  fill
                  className="object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-primary/80 text-white text-xs px-2 py-0.5 rounded">
                  After
                </span>
              </div>
            </div>
            {pair.caption && (
              <p className="text-sm text-gray-500 p-3 text-center">{pair.caption}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
