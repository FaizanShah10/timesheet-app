import { useState } from "react";
import { Timesheet, TimesheetEntry } from "@/lib/types";

export function useTimesheets() {
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // CREATE ENTRY (TASK)
  const addEntry = async (
  timesheetId: string,
  entry: Omit<TimesheetEntry, "id">
) => {
  try {
    setLoading(true);
    setError(null);

    const res = await fetch(
      `/api/timesheets/${timesheetId}/entries`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      }
    );

    const contentType = res.headers.get("content-type");

    if (!res.ok) {
      const errorText = contentType?.includes("application/json")
        ? (await res.json()).message
        : await res.text();

      throw new Error(errorText || "Failed to add entry");
    }

    if (!contentType?.includes("application/json")) {
      throw new Error("Invalid server response");
    }

    const updatedTimesheet = await res.json();

    setTimesheets((prev) =>
      prev.map((t) =>
        t.id === updatedTimesheet.id ? updatedTimesheet : t
      )
    );
  } catch (err: any) {
    console.error("Add entry failed:", err);
    setError(err.message);
    throw err;
  } finally {
    setLoading(false);
  }
};

  // READ ENTRY
  const fetchTimesheets = async () => {
  try {
    setLoading(true);
    setError(null);

    const res = await fetch("/api/timesheets");
    if (!res.ok) {
      throw new Error("Failed to fetch timesheets");
    }

    const data: Timesheet[] = await res.json();
    setTimesheets(data);
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  return {
    timesheets,
    loading,
    error,
    addEntry,
    fetchTimesheets,
    setTimesheets, // used after initial fetch
  };
}
