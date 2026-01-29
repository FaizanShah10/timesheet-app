"use client";

import { motion, cubicBezier  } from "framer-motion";
import LoginForm from "@/components/auth/LoginForm";

const riseUpText = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: cubicBezier(0.25, 0.1, 0.25, 1),
    },
  },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-row">
      {/* Left: Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-6">
        <LoginForm />
      </div>

      {/* Right: Branding Section */}
      <div className="hidden md:flex w-1/2 bg-[#1C64F2] items-center justify-center px-12">
        <div className="max-w-md text-white">
          {/* Animated Heading */}
          <motion.h1
            className="inter-bold text-4xl mb-4"
            variants={riseUpText}
            initial="hidden"
            animate="visible"
          >
            ticktock
          </motion.h1>

          {/* Animated Paragraph */}
          <motion.p
            className="inter-regular text-sm leading-relaxed opacity-90"
            variants={riseUpText}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.12 }}
          >
            Introducing ticktock, our cutting-edge timesheet web application
            designed to revolutionize how you manage employee work hours.
            With ticktock, you can effortlessly track and monitor employee
            attendance and productivity from anywhere, anytime, using any
            internet-connected device.
          </motion.p>
        </div>
      </div>
    </div>
  );
}
