export type TimesheetStatus =
  | "COMPLETED"
  | "INCOMPLETE"
  | "MISSING";

export type Timesheet = {
  id: string;
  weekNumber: number;
  startDate: string;
  endDate: string;
  status: TimesheetStatus;
  entries: TimesheetEntry[];
};



export type TimesheetEntry = {
  id: string;
  date: string;          // YYYY-MM-DD
  project: string;
  workType: string;
  description: string;
  hours: number;
};
