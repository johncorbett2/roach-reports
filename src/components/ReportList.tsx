"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

// ✅ Define the shape of a report object
type Report = {
  id: string;
  apartment_address: string;
  has_roaches: boolean;
  notes: string;
  created_at: string;
};

export default function ReportList() {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    async function fetchReports() {
      const { data } = await supabase
        .from("reports")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) setReports(data as Report[]);
    }
    fetchReports();
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto">
      {reports.map((r) => (
        <div key={r.id} className="border rounded p-4 mb-2">
          <p className="font-bold">{r.apartment_address}</p>
          <p>{r.has_roaches ? "🚨 Roaches reported" : "✅ No roaches"}</p>
          {r.notes && <p className="text-sm mt-1">{r.notes}</p>}
          <p className="text-xs text-gray-500 mt-1">
            {new Date(r.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
