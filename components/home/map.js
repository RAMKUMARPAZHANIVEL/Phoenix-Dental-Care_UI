// components/MapRedirect.tsx
export default function MapRedirect() {
  const lat = 12.936842799999999;
  const lng = 80.1417894;

  const mapUrl = `https://www.google.com/maps?q=${lat},${lng}`;

  return (
    <a
      href={mapUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full h-[300px] rounded-lg overflow-hidden border"
    >
      <iframe
        src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
        className="w-full h-full pointer-events-none"
        loading="lazy"
      />
    </a>
  );
}
