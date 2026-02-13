"use client";
import { motion } from "framer-motion";
import { container } from "./variants";

export default function StaggerContainer({ children, className }) {
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,      // animate only once
      }}
    >
      {children}
    </motion.div>
  );
}