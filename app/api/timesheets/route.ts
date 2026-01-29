import { NextResponse } from "next/server";
import { getTimesheet, getTimesheets, updateTimesheet } from "@/lib/mockData";


export async function GET() {
  const timesheets = getTimesheets();
  return NextResponse.json(timesheets);
}

