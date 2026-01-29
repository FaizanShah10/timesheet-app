import DashboardHeader from "@/components/dashboard/DashboardHeader";
import TimesheetsCard from "@/components/dashboard/TimeSheetsCard";
import DashboardFooter from "@/components/dashboard/DashboardFooter";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="px-4 md:px-8 py-8">
        <TimesheetsCard />
      </main>

      <DashboardFooter />
    </div>
  );
}
