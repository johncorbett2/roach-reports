import ReportForm from "@/components/ReportForm";
import ReportList from "@/components/ReportList";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <h1 className="text-center text-2xl font-bold my-6">Roach Motel</h1>
      <ReportForm />
      <hr className="my-4" />
      <ReportList />
    </main>
  );
}
