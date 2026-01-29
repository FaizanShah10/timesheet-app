"use client";

import { motion } from "framer-motion";
import TimesheetsTable from "./TimeSheetsTable";
import { Variants } from "framer-motion";

export const riseUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function TimesheetsCard() {
  return (
    <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md border p-6">
      {/* Heading */}
      <motion.h2
        className="inter-bold text-[24px] text-gray-900 mb-4"
        variants={riseUp}
        initial="hidden"
        animate="visible"
      >
        Your Timesheets
      </motion.h2>

      {/* Filters */}
      <motion.div
        className="flex flex-wrap gap-3 mb-6"
        variants={riseUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
      >
        <select className="h-10 px-4 border rounded-lg inter-regular text-sm border-gray-300 text-gray-500">
          <option>Date Range</option>
        </select>
        <select className="h-10 px-4 border rounded-lg inter-regular text-sm border-gray-300 text-gray-500">
          <option>Status</option>
        </select>
      </motion.div>

      <TimesheetsTable />
    </div>
  );
}
