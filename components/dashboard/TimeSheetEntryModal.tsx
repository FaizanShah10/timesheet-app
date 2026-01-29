"use client";

import { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: EntryFormData) => Promise<void>;
};

export type EntryFormData = {
  project: string;
  workType: string;
  description: string;
  hours: number;
};

type EntryFormErrors = Partial<Record<keyof EntryFormData, string>>;

export default function TimesheetEntryModal({
  open,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<EntryFormData>({
    project: "",
    workType: "",
    description: "",
    hours: 12,
  });

  const [errors, setErrors] = useState<EntryFormErrors>({});
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const validate = () => {
    const e: EntryFormErrors = {};

    if (!form.project) {
      e.project = "Project is required";
      console.warn("Validation error: project missing");
    }

    if (!form.workType) {
      e.workType = "Type of work is required";
      console.warn("Validation error: workType missing");
    }

    if (!form.description.trim()) {
      e.description = "Description is required";
      console.warn("Validation error: description missing");
    }

    if (form.hours <= 0) {
      e.hours = "Hours must be greater than 0";
      console.warn("Validation error: invalid hours", form.hours);
    }

    if (Object.keys(e).length > 0) {
      console.group("❌ Timesheet Entry Validation Failed");
      console.table(e);
      console.log("Form values:", form);
      console.groupEnd();
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    onClose()
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="inter-semibold text-lg text-gray-900">
            Add New Entry
          </h2>
          <button className="cursor-pointer" onClick={onClose}>
            <MdOutlineCancel className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-2 max-h-[70vh] overflow-y-auto">
          {/* Project */}
          <FieldLabel label="Select Project" required />
          <select
            className="input w-90 border border-gray-500 text-gray-500 cursor-pointer px-3 py-2 rounded-lg mb-6"
            value={form.project}
            onChange={(e) => setForm({ ...form, project: e.target.value })}
          >
            <option value="">Project Name</option>
            <option>Website</option>
            <option>Mobile App</option>
          </select>

          {errors.project && (
            <p className="mt-1 text-xs text-red-600 inter-regular">
              {errors.project}
            </p>
          )}

          {/* Work Type */}
          <FieldLabel label="Type of Work" required />
          <select
            className="input w-90 border border-gray-500 text-gray-500 cursor-pointer px-3 py-2 rounded-lg mb-6"
            value={form.workType}
            onChange={(e) => setForm({ ...form, workType: e.target.value })}
          >
            <option value="">Bug fixes</option>
            <option>Development</option>
            <option>Design</option>
          </select>

          {errors.workType && (
            <p className="mt-1 text-xs text-red-600 inter-regular">
              {errors.workType}
            </p>
          )}

          {/* Description */}
          <FieldLabel label="Task description" required />
          <textarea
            rows={4}
            className="input resize-none w-98 border border-gray-500 text-gray-500 cursor-pointer px-3 py-2 rounded-lg"
            placeholder="Write text here ..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-600 inter-regular">
              {errors.description}
            </p>
          )}

          <p className="text-xs text-gray-500 inter-regular mb-6">
            A note for extra info
          </p>

          {/* Hours */}
          <FieldLabel label="Hours" required />
          <div className="flex items-center w-fit border rounded-lg overflow-hidden text-gray-500">
            <button
              className="px-3 py-2 text-lg"
              onClick={() =>
                setForm({
                  ...form,
                  hours: Math.max(1, form.hours - 1),
                })
              }
            >
              −
            </button>
            <div className="px-6 inter-medium">{form.hours}</div>
            <button
              className="px-4 py-2 text-lg"
              onClick={() => setForm({ ...form, hours: form.hours + 1 })}
            >
              +
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 h-11 cursor-pointer bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white rounded-md inter-medium disabled:opacity-60"
          >
            {loading ? "Saving..." : "Add entry"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 cursor-pointer text-gray-400 hover:bg-gray-50 transition-all duration-300 border-gray-300 h-11 border rounded-md inter-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

/* ----------------- */
/* Helper components */
/* ----------------- */

function FieldLabel({
  label,
  required,
}: {
  label: string;
  required?: boolean;
}) {
  return (
    <label className="flex items-center gap-1 inter-medium text-sm text-gray-800">
      {label}
      {required && <span className="text-red-500">*</span>}
      <span className="ml-1 text-gray-400 text-xs">ⓘ</span>
    </label>
  );
}
