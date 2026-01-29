import { Timesheet, TimesheetStatus } from "./types";

const EXPECTED_WEEKLY_HOURS = 40;

export function calculateStatus(timesheet: Timesheet): TimesheetStatus {
  if (timesheet.entries.length === 0) return "MISSING";

  const totalHours = timesheet.entries.reduce(
    (sum, entry) => sum + entry.hours,
    0
  );

  if (totalHours >= EXPECTED_WEEKLY_HOURS) return "COMPLETED";

  return "INCOMPLETE";
}
