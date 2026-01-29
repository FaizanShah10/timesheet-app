import {z} from 'zod'

export const timesheetEntrySchema = z.object({
  date: z.string().min(1, "Date is required"),
  project: z.string().min(1, "Project is required"),
  workType: z.string().min(1, "Type of work is required"),
  description: z.string().min(5, "Description is required"),
  hours: z.number().min(0.5).max(24),
});