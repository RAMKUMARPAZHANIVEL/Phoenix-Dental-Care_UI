import team from "../../data/team";
import DoctorCard from "../team/DoctorCard";

export default function TreatmentDoctor({ doctorId }) {
  if (!doctorId) return null;
  const doctor = team.find((d) => d.id === doctorId);
  if (!doctor) return null;
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Meet Your Doctor</h2>
      <DoctorCard member={doctor} />
    </section>
  );
}
