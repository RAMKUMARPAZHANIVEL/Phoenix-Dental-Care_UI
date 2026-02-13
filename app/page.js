
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/footer";
import OurDoctor from "../components/home/ourDoctor";
import WhyChooseUs from "../components/home/whyChooseUs";
import { FiPhone, FiMail } from "react-icons/fi";
import Offers from "../components/home/offers";
import Stats from "../components/Stats";
import MapRedirect from "../components/home/map";
import TestimonialSlider from "../components/home/testimonialSlider";
import TreatmentHero from "../components/home/treatmentsHero";
import FadeUp from "./utils/animations/FadeUp";
import StaggerContainer from "./utils/animations/StaggerContainer";
import { motion } from "framer-motion";
import Treatments from "../components/home/treatments";
import { whatsappUrl } from "./utils/config";

// const Treatments = [
//   {
//     "name": "Preventive Dentistry",
//     "description": "Protect your smile before problems begin.Our preventive care includes routine check-ups, professional cleaning, fluoride application, and sealants to maintain strong and healthy teeth.",
//     "image_src": "/images/preventive.jpeg"
//   },
//   {
//     "name": "Cosmetic Dentistry",
//     "description": "Enhance your smile’s beauty with safe and effective cosmetic treatments like teeth whitening, veneers, and smile design — tailored to boost your confidence.",
//     "image_src": "/images/cosmetic.jpg"
//   },
//   {
//     "name": "Restorative Dentistry",
//     "description": "Restore damaged or missing teeth with advanced restorations, including tooth-colored fillings, crowns, bridges, and dental implants for a natural look and feel.",
//     "image_src": "/images/restorative.jpeg"
//   },
//   {
//     "name": "Pediatric Dentistry",
//     "description": "Gentle dental care for your little ones.We specialize in treating children with patience and care — ensuring a positive dental experience from their very first visit.",
//     "image_src": "/images/pediatric.jpeg"
//   },
//   {
//     "name": "Root Canal Treatment (Endodontics)",
//     "description": "Save your natural teeth with comfortable and precise root canal procedures, performed using advanced technology for pain-free results.",
//     "image_src": "/images/root_canal.jpg"
//   },
//   {
//     "name": "Orthodontics (Braces & Aligners)",
//     "description": "Correct misaligned teeth and improve your bite with traditional braces or clear aligners for a confident, well-aligned smile.",
//     "image_src": "/images/braces.jpg"
//   },
//   {
//     "name": "Gum Care (Periodontics)",
//     "description": "Healthy gums are the foundation of a beautiful smile.We provide scaling, deep cleaning, and gum therapy to prevent and treat gum disease.",
//     "image_src": "/images/periodontics.jpg"
//   },
//   {
//     "name": "Tooth Replacement Solutions",
//     "description": "Replace missing teeth with lifelike options such as dentures, bridges, or implants — restoring both function and confidence.",
//     "image_src": "/images/tooth_replacement.jpg"
//   },
//   {
//     "name": "Painless & Laser Dentistry",
//     "description": "Experience modern, stress-free dentistry with advanced laser techniques that ensure faster healing, minimal discomfort, and precise results.",
//     "image_src": "/images/laser_dentistry.jpg"
//   },
//   {
//     "name": "Smile Makeover",
//     "description": "Transform your smile with a personalized smile makeover plan — combining cosmetic and restorative treatments to bring out your best smile.",
//     "image_src": "/images/smile.jpeg"
//   }
// ];
export default function Home() {
  return (
    <main className="bg-[#F8F9FA]">
      <Header />
        <div className="relative overflow-hidden">
          {/* Floating Icons */}
          <span className="bg-icon top-10 right-10">🦷</span>
          <span className="bg-icon top-[50%] right-10">✨</span>
          <span className="bg-icon bottom-20 left-16">➕</span>

          {/* Content */}
          <div className="relative z-10">
            <div className="max-w-7xl mx-auto flex flex-col p-6 lg:p-0 md:gap-10 gap-20">

              <section className="max-w-7xl mx-auto md:px-20 md:py-10 grid md:grid-cols-2 gap-10 items-center">
                <FadeUp delay={0.3}>
                  <div className="animate-fadeIn">
                    <h2 className="text-4xl font-bold mb-4">
                      Rejuvenating Smiles...
                    </h2>
                    <p className="mb-6 text-lg">
                      Start your smile journey with us — book your appointment and discover the Phoenix Dental Care difference.
                    </p>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-fit bg-primary text-white px-6 py-3 rounded-xl shadow hover:scale-105 transition"
                    >
                      Book Appointment
                    </a>
                  </div>
                </FadeUp>

                {/* <div className="relative max-w-md mx-auto lg:mt-14">
                  <div className="w-[80%] flex items-center justify-end overflow-hidden rounded-sm mx-auto">
                    <img className="animate-slow-zoom-loop" src="../images/Banner1.jpeg" />
                    <div className="glassy-dark absolute bottom-5 right-[40px] w-40 p-2 rounded-l-full">
                      <p className="text-sm text-white font-bold align-text-bottom mt-auto">Treatments</p>
                    </div>
                    <div className="bg-[black] absolute bottom-6 -left-4 w-12 h-12"></div>
                    <div className="bg-[yellow] absolute -bottom-4 left-8 w-12 h-12 rounded-sm border-4 border-[#F8F9FA]"></div>
                    <div className="bg-[blue] absolute -bottom-14 left-20 w-12 h-12"></div>
                    <div className="bg-[orange] absolute -bottom-12 -left-6 w-12 h-12"></div>
                    <div className="bg-[red] absolute -bottom-20 left-2 w-12 h-12"></div>
                  </div>
                </div> */}
                <TreatmentHero />
              </section>
              <FadeUp delay={0.2}>
                <section id="about" className="bg-pink-50 md:py-20">
                  <div className="max-w-5xl mx-auto px-1 md:px-6 text-center">
                    <h3 className="text-3xl font-bold text-primary mb-10">About Us</h3>
                    <p className="text-lg text-[#000] text-left">
                      Dr. Divya’s Phoenix Dental Care is your trusted neighborhood dental clinic in Chitlapakkam, Chennai, dedicated to providing gentle, advanced, and affordable dental care for all ages.
                      Led by Dr. Divya, we focus mainly on painless dentistry, combining modern technology with compassionate care to ensure every patient feels comfortable and relaxed.
                      From preventive and restorative treatments to cosmetic and pediatric dentistry, we provide personalized solutions to help you achieve a healthy, confident smile.
                    </p>
                  </div>
                </section>
              </FadeUp>
              
              <FadeUp delay={0.3}>      
                 <OurDoctor />
              </FadeUp>

              <Treatments /> 
              {/* <section id="treatments">
                <div className="max-w-7xl mx-auto px-6">
                  <h3 className="text-3xl font-bold text-primary mb-10 text-center">Our Treatments</h3>
                  <div className="grid lg:grid-cols-3 gap-5">
                    <StaggerContainer>
                      {Treatments.map((t) => (
                        <motion.div key={t.name} variants={item}>
                          <div key={t} className="bg-[#fff] flex flex-col gap-4 p-6 rounded-xl border hover:shadow-lg transition">
                            <h4 className="font-semibold mb-2">{t.name}</h4>
                            <Image width={200} height={200} src={t.image_src} className="w-full rounded-sm shadow-md mx-auto"/>
                            <p className="text-sm">{t.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </StaggerContainer>
                  </div>
                </div>
              </section> */}

               <FadeUp delay={0.3}>     
                 <WhyChooseUs />
               </FadeUp>

               <FadeUp delay={0.3}>
                 <TestimonialSlider />
               </FadeUp>

              <FadeUp delay={0.3}>
                <Offers />
              </FadeUp>   

              <Stats />

              <FadeUp delay={0.3}> 
                <MapRedirect />            
              </FadeUp>

              <div className="mx-auto ">
                <Image height={400} width={600} className="rounded-2xl" src="/images/rate_us.jpeg" />
              </div>

              <FadeUp delay={0.3}>
                <section id="contact" className="bg-pink-50 py-0 lg:py-20">
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
              </FadeUp>

            </div>
          </div>
        </div>
      <Footer />
    </main>
  );
}
