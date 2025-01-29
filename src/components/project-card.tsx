"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ProjectInfo } from "@/lib/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ProjectProps = ProjectInfo;

export default function Project({
  title,
  description,
  tags,
  imageUrls,
}: ProjectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
    );
  };

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgess,
        opacity: opacityProgess,
      }}
      className="group mb-6 sm:mb-10 last:mb-0"
    >
      <section className="bg-white max-w-[60rem] w-full mx-auto border border-black/5 rounded-lg overflow-hidden sm:pr-12 relative hover:bg-gray-200 transition dark:text-white dark:bg-white/10 dark:hover:bg-white/20 flex flex-col">
        {/* Text Content */}
        <div className="pt-6 pb-6 px-6 flex flex-col">
          <h3 className="text-3xl font-bold">{title}</h3>
          <p className="mt-4 leading-relaxed text-gray-700 dark:text-white/70 text-lg">
            {description}
          </p>
          <ul className="flex flex-wrap mt-6 gap-3">
            {tags.map((tag, index) => (
              <li
                className="bg-black/[0.7] px-4 py-2 text-sm uppercase tracking-wider text-white rounded-full dark:text-white/70"
                key={index}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        {/* Image Gallery */}
        <div className="w-full flex flex-col items-center justify-center px-6 pb-6">
          <div className="relative w-full h-64 sm:h-96 flex items-center justify-center">
            {/* Swipeable Image */}
            <AnimatePresence initial={false}>
              <motion.div
                key={currentIndex}
                className="absolute w-full h-full flex items-center justify-center"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={imageUrls[currentIndex]}
                  alt={`Gallery image ${currentIndex + 1}`}
                  quality={95}
                  fill
                  className="object-cover rounded-lg shadow-lg"
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-3 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-10"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-10"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
