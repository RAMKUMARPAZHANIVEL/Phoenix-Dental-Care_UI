"use client";

import { useEffect, useRef, useState } from "react";
import FadeUp from "../app/utils/animations/FadeUp";
import { Client_count, Experience_count } from "../app/utils/config";

function Counter({ target, label, suffix = "+" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          let start = 0;
          const duration = 1500; // ms
          const stepTime = 20;
          const steps = duration / stepTime;
          const increment = target / steps;

          const interval = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(interval);
            } else {
              setCount(Math.floor(start));
            }
          }, stepTime);
        }
      },
      { threshold: 0.6 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center">
      <h1 className="text-6xl font-bold">
        {count}
        {count === target && suffix}
      </h1>
      <p className="text-xl opacity-90 mt-2">{label}</p>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="bg-emerald-500 text-white py-32 flex flex-col gap-12 items-center">
      <FadeUp delay={0.1}>
        <Counter target={Experience_count} label="Years of Experience" />
      </FadeUp>
      <FadeUp delay={0.5}>
        <Counter target={Client_count} label="Smiling Clients" />
      </FadeUp>
    </section>
  );
}
