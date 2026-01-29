"use client";

import { motion } from "framer-motion";
import { useTimesheets } from "@/hooks/useTimesheets";
import StatusBadge from "./StatusBadge";
import Pagination from "./Pagination";
import { useEffect, useState } from "react";
import TimesheetEntryModal, { EntryFormData } from "./TimeSheetEntryModal";
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

const tableBodyVariants = {
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function TimesheetsTable() {
  const { timesheets, loading, error, addEntry, fetchTimesheets } =
    useTimesheets();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTimesheetId, setActiveTimesheetId] = useState<string | null>(null);

  useEffect(() => {
    fetchTimesheets();
  }, []);

  const handleOpenModal = (timesheetId: string) => {
    setActiveTimesheetId(timesheetId);
    setModalOpen(true);
  };

  const handleSubmit = async (data: EntryFormData) => {
    if (!activeTimesheetId) return;

    await addEntry(activeTimesheetId, {
      project: data.project,
      workType: data.workType,
      description: data.description,
      hours: data.hours,
      date: new Date().toISOString().split("T")[0],
    });
  };

  if (loading || error || !timesheets.length) {
    return null;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 inter-medium text-xs text-gray-600">
              WEEK #
            </th>
            <th className="px-4 py-3 inter-medium text-xs text-gray-600">
              DATE
            </th>
            <th className="px-4 py-3 inter-medium text-xs text-gray-600">
              STATUS
            </th>
            <th className="px-4 py-3 inter-medium text-xs text-gray-600 text-right">
              ACTIONS
            </th>
          </tr>
        </thead>

        <motion.tbody
          variants={tableBodyVariants}
          initial="hidden"
          animate="visible"
        >
          {timesheets.map((sheet) => {
            const action =
              sheet.status === "MISSING"
                ? "Create"
                : sheet.status === "INCOMPLETE"
                ? "Update"
                : "View";

            return (
              <motion.tr
                key={sheet.id}
                className="border-t"
                variants={riseUp}
              >
                <td className="px-4 py-4 inter-regular text-sm text-gray-900">
                  {sheet.weekNumber}
                </td>
                <td className="px-4 py-4 inter-regular text-sm text-gray-600">
                  {formatDateRange(sheet.startDate, sheet.endDate)}
                </td>
                <td className="px-4 py-4">
                  <StatusBadge status={sheet.status} />
                </td>
                <td className="px-4 py-4 text-right">
                  <button
                    onClick={() => handleOpenModal(sheet.id)}
                    className="inter-medium text-sm text-blue-600 hover:underline"
                  >
                    {action}
                  </button>
                </td>
              </motion.tr>
            );
          })}
        </motion.tbody>
      </table>

      {/* Footer */}
      <motion.div
        className="flex flex-wrap justify-between items-center mt-4 gap-4"
        variants={riseUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        <select className="h-9 px-3 bg-[#F9FAFB] border-[#E5E7EB] text-[#4A5565] border rounded-md inter-regular text-sm">
          <option>5 per page</option>
          <option>10 per page</option>
          <option>15 per page</option>
        </select>

        <Pagination />
      </motion.div>

      <TimesheetEntryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
function formatDateRange(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);  
  const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  const startStr = startDate.toLocaleDateString(undefined, options);
  const endStr = endDate.toLocaleDateString(undefined, options);
  return `${startStr} - ${endStr}`;
}
