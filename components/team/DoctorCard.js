import Image from "next/image";

export default function DoctorCard({ member }) {
  return (
    <div className="bg-white rounded-2xl border p-8 flex flex-col md:flex-row gap-8 items-start">
      <div className="shrink-0">
        {member.imageSrc ? (
          <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-pink-100">
            <Image
              src={member.imageSrc}
              alt={`Photo of ${member.name}`}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-40 h-40 rounded-full bg-pink-50 border-4 border-pink-100 flex items-center justify-center text-5xl">
            🦷
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{member.name}</h2>
          <p className="text-primary font-medium">{member.title}</p>
          <p className="text-sm text-gray-500 mt-1">{member.qualifications}</p>
        </div>
        <p className="text-gray-600 leading-relaxed">{member.bio}</p>
      </div>
    </div>
  );
}
