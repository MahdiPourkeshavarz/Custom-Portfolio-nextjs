"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/useInView";
import SubmitBtn from "./submit-btn";
import { FaInstagram, FaTelegram, FaPhone } from "react-icons/fa";
import ContactCard from "./contact-card";

export default function Contact() {
  const { ref } = useSectionInView("#contact");

  // Coordinates for the shop's location
  const shopCoordinates = {
    latitude: 35.668652, // Replace with your latitude
    longitude: 51.350097, // Replace with your longitude
  };

  // Function to handle map click
  const handleMapClick = () => {
    const { latitude, longitude } = shopCoordinates;
    const openStreetMapUrl = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=16/${latitude}/${longitude}`;
    window.open(openStreetMapUrl, "_blank");
  };

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 sm:mb-28 scroll-mt-28 w-[min(100%,38rem)] text-center"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <SectionHeading>{"راه های ارتباطی"}</SectionHeading>

      <p className="text-gray-700 -mt-6 dark:text-white/80">
        {
          "Feel free to contact me directly through this form or via the links below."
        }
      </p>

      {/* Contact Cards */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ContactCard
          icon={<FaInstagram />}
          title="Instagram"
          link="https://instagram.com/yourusername"
          linkText="@yourusername"
        />
        <ContactCard
          icon={<FaTelegram />}
          title="Telegram"
          link="https://t.me/yourusername"
          linkText="@yourusername"
        />
        <ContactCard
          icon={<FaPhone />}
          title="Phone"
          link="tel:+1234567890"
          linkText="+1234567890"
        />
      </div>

      {/* Map Section */}
      <div
        className="mt-8 border rounded-lg overflow-hidden cursor-pointer"
        onClick={handleMapClick}
      >
        {/* Embed OpenStreetMap */}
        <iframe
          title="Shop Location"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${
            shopCoordinates.longitude - 0.01
          }%2C${shopCoordinates.latitude - 0.01}%2C${
            shopCoordinates.longitude + 0.01
          }%2C${shopCoordinates.latitude + 0.01}&layer=mapnik&marker=${
            shopCoordinates.latitude
          }%2C${shopCoordinates.longitude}`}
          width="100%"
          height="300"
          className="border-none"
        ></iframe>
      </div>

      {/* Contact Form */}
      <form className="mt-10 flex flex-col dark:text-black">
        <input
          className="h-14 px-4 rounded-lg borderBlack dark:bg-white dark:bg-opacity-20 dark:focus:bg-opacity-10 transition-all dark:outline-none"
          name="senderEmail"
          type="email"
          required
          maxLength={500}
          placeholder={"Your email"}
        />
        <textarea
          className="h-52 my-3 rounded-lg resize-none borderBlack p-4 dark:bg-white dark:bg-opacity-20 dark:focus:bg-opacity-10 transition-all dark:outline-none"
          name="message"
          placeholder={"Your message"}
          required
          maxLength={5000}
        />
        <SubmitBtn text={"Submit"} />
      </form>
    </motion.section>
  );
}
