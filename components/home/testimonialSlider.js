"use client";

import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    name: "Suresh Kumar",
    treatment: "Root Canal Treatment",
    review:
      "Dr Divya explained the procedure clearly and made me feel very comfortable. Completely painless experience!",
  },
  {
    name: "Priya R",
    treatment: "Teeth Whitening",
    review:
      "The clinic is very clean and modern. My smile looks amazing now. Highly recommended!",
  },
  {
    name: "Arun S",
    treatment: "Dental Implant",
    review:
      "Professional treatment and friendly staff. One of the best dental clinics in Chitlapakkam.",
  },
];

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null); // ✅ JS-safe

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide;
  }, []);

  return (
    <div
      className="relative max-w-full md:max-w-xl mx-auto overflow-hidden"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {testimonials.map((t, i) => (
          <div key={i} className="min-w-full px-4">
            <div className="bg-white rounded-2xl shadow-lg px-12 py-16 text-center">
              <p className="text-gray-700 italic mb-8">“{t.review}”</p>
              <h4 className="font-semibold text-lg">{t.name}</h4>
              <p className="text-sm text-blue-600">{t.treatment}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${
              index === i ? "bg-primary w-6" : "bg-gray-300 w-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
