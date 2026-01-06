
import Header from "../components/Header";
import Footer from "../components/footer";
import OurDoctor from "../components/home/ourDoctor";
import WhyChooseUs from "../components/home/whyChooseUs";
import { FiPhone, FiMail } from "react-icons/fi";

export default function Home() {
  return (
    <>
      <Header />

      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div className="animate-fadeIn">
          <h2 className="text-4xl font-bold mb-4">
            Rejuvenating Smiles...
          </h2>
          <p className="mb-6 text-lg">
            Start your smile journey with us — book your appointment and discover the Phoenix Dental Care difference.
          </p>
          <a
            href="https://wa.me/919003226380"
            className="inline-block bg-primary text-white px-6 py-3 rounded-xl shadow hover:scale-105 transition"
          >
            Book Appointment
          </a>
        </div>
        <div className="h-64 bg-pink-100 rounded-3xl flex items-center justify-center">
          {/* <span className="text-primary font-semibold">Clinic Image</span> */}
          <img src="../images/Banner1.jpeg" />
        </div>
      </section>

      <section id="about" className="bg-pink-50 py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-semibold text-primary mb-4">About Us</h3>
          <p className="text-lg text-[#000]">
            Dr. Divya’s Phoenix Dental Care is your trusted neighborhood dental clinic in Chitlapakkam, Chennai, dedicated to providing gentle, advanced, and affordable dental care for all ages.
            Led by Dr. Divya, we focus mainly on painless dentistry, combining modern technology with compassionate care to ensure every patient feels comfortable and relaxed.
            From preventive and restorative treatments to cosmetic and pediatric dentistry, we provide personalized solutions to help you achieve a healthy, confident smile.
          </p>
        </div>
      </section>

      <section>
        <OurDoctor />
      </section>

      <section id="treatments" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-semibold text-primary mb-10 text-center">Our Treatments</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {["Preventive", "Cosmetic", "Restorative", "Pediatric", "Root Canal", "Smile Design"].map(t => (
              <div key={t} className="p-6 rounded-2xl border hover:shadow-lg transition">
                <h4 className="font-semibold mb-2">{t} Dentistry</h4>
                <p>Gentle, painless care using modern dental techniques.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <WhyChooseUs />
      </section>

      <section id="contact" className="bg-pink-50 py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-semibold text-primary mb-4">Contact</h3>
          <p>
            DR DIVYA.S, B.D.S, M.D.S., <br />
            Family Dental Surgeon, Aesthetician, Adult and Children’s Dentist <br />
            Associate Professor in Dental College <br />
            No 58/60,  Ground floor, Anna Street, Chitlapakkam, Chennai -600064
          </p>
          <div className="flex items-center gap-2 w-fit mx-auto">
            <FiPhone className="text-pink-500" />
            <span>+91 90032 26380</span>
          </div>
          <div className="flex items-center gap-2 w-fit mx-auto">
            <FiMail className="text-pink-500" />
            <span>phoenixdentalc@gmail.com</span>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
