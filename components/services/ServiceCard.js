import Image from "next/image";
import Link from "next/link";

export default function ServiceCard({ service }) {
  return (
    <div className="bg-white rounded-xl border hover:shadow-lg transition flex flex-col">
      <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
        <Image
          src={service.imageSrc}
          alt={service.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
        <p className="text-sm text-gray-600 flex-1">{service.summary}</p>
        <Link
          href={`/services/${service.slug}`}
          className="mt-4 inline-block text-primary font-medium hover:underline text-sm"
        >
          Learn More →
        </Link>
      </div>
    </div>
  );
}
