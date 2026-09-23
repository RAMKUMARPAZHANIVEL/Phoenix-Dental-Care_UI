import Image from "next/image";

const categoryLabels = {
  cosmetic: "Cosmetic",
  specialty: "Specialty",
  restorative: "Restorative",
  preventive: "Preventive",
};

export default function TreatmentHero({ name, imageSrc, heroAlt, category }) {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden mb-10">
      <div className="relative w-full h-72 md:h-96">
        <Image
          src={imageSrc}
          alt={heroAlt || name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
        {category && (
          <span className="inline-block bg-primary/90 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
            {categoryLabels[category] || category}
          </span>
        )}
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
          {name}
        </h1>
      </div>
    </div>
  );
}
