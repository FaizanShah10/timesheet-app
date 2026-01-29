"use client";

import { useSearchParams } from "next/navigation";

type Props = {
  timesheetId: string;
};

export default function TimesheetDetails({ timesheetId }: Props) {
  const searchParams = useSearchParams();
  const mode =
    (searchParams.get("mode") as
      | "view"
      | "edit"
      | "create") ?? "view";

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-8 py-8">
      <div className="max-w-5xl mx-auto bg-white border rounded-lg p-6">
        <header className="mb-6">
          <h1 className="inter-semibold text-xl text-gray-900">
            Weekly Timesheet
          </h1>
          <p className="inter-regular text-sm text-gray-500">
            Mode: <span className="capitalize">{mode}</span>
          </p>
        </header>

        {mode === "view" && (
          <p className="inter-regular text-sm text-gray-600">
            This timesheet is completed and read-only.
          </p>
        )}

        {mode === "edit" && (
          <p className="inter-regular text-sm text-gray-600">
            You can update existing entries or add more hours.
          </p>
        )}

        {mode === "create" && (
          <p className="inter-regular text-sm text-gray-600">
            No entries found. Start creating your timesheet.
          </p>
        )}
      </div>
    </div>
  );
}
