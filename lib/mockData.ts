import { Timesheet } from "./types";

export let timesheets: Timesheet[] = [
  {
    id: "1",
    weekNumber: 1,
    startDate: "2024-01-01",
    endDate: "2024-01-05",
    status: "COMPLETED",
    entries: [],
  },
  {
    id: "2",
    weekNumber: 2,
    startDate: "2024-01-08",
    endDate: "2024-01-12",
    status: "INCOMPLETE",
    entries: [],
  },
  {
    id: "3",
    weekNumber: 3,
    startDate: "2024-01-15",
    endDate: "2024-01-19",
    status: "MISSING",
    entries: [],
  },
];

export function getTimesheets() {
  return timesheets;
}

export function getTimesheet(id: string) {
  return timesheets.find((t) => t.id === id);
}

export function updateTimesheet(updated: Timesheet) {
  timesheets = timesheets.map((t) =>
    t.id === updated.id ? updated : t
  );
}
