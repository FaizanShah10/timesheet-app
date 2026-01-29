"use client";

import { MdKeyboardArrowDown } from "react-icons/md";
import { signOut } from "next-auth/react";

export default function DashboardHeader() {
  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/login",
    });
  };

  return (
    <header className="bg-white border-b">
      <div className="h-16 px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="inter-bold text-lg text-gray-900">
            ticktock
          </span>
          <span className="inter-regular text-sm text-gray-600">
            Timesheets
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inter-regular text-sm text-gray-700">
            John Doe
          </span>
          <MdKeyboardArrowDown className="text-gray-600" />
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-all duration-300 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
