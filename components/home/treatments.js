"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import StaggerContainer from "../../app/utils/animations/StaggerContainer";
import { item, fadeRightToLeft, fadeUp, smoothTransition } from "../../app/utils/animations/variants";

const TreatmentList = [
  {
    "name": "Preventive Dentistry",
    "description": "Protect your smile before problems begin.Our preventive care includes routine check-ups, professional cleaning, fluoride application, and sealants to maintain strong and healthy teeth.",
    "image_src": "/images/preventive.jpeg"
  },
  {
    "name": "Cosmetic Dentistry",
    "description": "Enhance your smile’s beauty with safe and effective cosmetic treatments like teeth whitening, veneers, and smile design — tailored to boost your confidence.",
    "image_src": "/images/cosmetic.jpg"
  },
  {
    "name": "Restorative Dentistry",
    "description": "Restore damaged or missing teeth with advanced restorations, including tooth-colored fillings, crowns, bridges, and dental implants for a natural look and feel.",
    "image_src": "/images/restorative.jpeg"
  },
  {
    "name": "Pediatric Dentistry",
    "description": "Gentle dental care for your little ones.We specialize in treating children with patience and care — ensuring a positive dental experience from their very first visit.",
    "image_src": "/images/pediatric.jpeg"
  },
  {
    "name": "Root Canal Treatment (Endodontics)",
    "description": "Save your natural teeth with comfortable and precise root canal procedures, performed using advanced technology for pain-free results.",
    "image_src": "/images/root_canal.jpg"
  },
  {
    "name": "Orthodontics (Braces & Aligners)",
    "description": "Correct misaligned teeth and improve your bite with traditional braces or clear aligners for a confident, well-aligned smile.",
    "image_src": "/images/braces.jpg"
  },
  {
    "name": "Gum Care (Periodontics)",
    "description": "Healthy gums are the foundation of a beautiful smile.We provide scaling, deep cleaning, and gum therapy to prevent and treat gum disease.",
    "image_src": "/images/periodontics.jpg"
  },
  {
    "name": "Tooth Replacement Solutions",
    "description": "Replace missing teeth with lifelike options such as dentures, bridges, or implants — restoring both function and confidence.",
    "image_src": "/images/tooth_replacement.jpg"
  },
  {
    "name": "Painless & Laser Dentistry",
    "description": "Experience modern, stress-free dentistry with advanced laser techniques that ensure faster healing, minimal discomfort, and precise results.",
    "image_src": "/images/laser_dentistry.jpg"
  },
  {
    "name": "Smile Makeover",
    "description": "Transform your smile with a personalized smile makeover plan — combining cosmetic and restorative treatments to bring out your best smile.",
    "image_src": "/images/smile.jpeg"
  }
];

const Treatments = () => {
  return (
     <section id="treatments">
        <div className="max-w-7xl mx-auto px-6">
        <h3 className="text-3xl font-bold text-primary mb-10 text-center">
            Our Treatments
        </h3>

       <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TreatmentList.map((t, index) => (
            <motion.div
                key={t.name}
                variants={index % 2 === 0 ? fadeRightToLeft : fadeUp}
                transition={smoothTransition}
            >
                <div className="bg-white p-6 rounded-xl border hover:shadow-lg transition">
                <h4 className="font-semibold">{t.name}</h4>
                <Image
                    width={400}
                    height={300}
                    src={t.image_src}
                    alt={t.name}
                    className="w-full rounded-md mt-4"
                />
                <p className="text-sm mt-4">{t.description}</p>
                </div>
            </motion.div>
            ))}
        </StaggerContainer>
        </div>
    </section>
  )
}

export default Treatments