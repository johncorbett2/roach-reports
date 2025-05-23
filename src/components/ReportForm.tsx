"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase";

export default function ReportForm() {
  const [form, setForm] = useState({ address: "", hasRoaches: false, notes: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("reports").insert([{
      apartment_address: form.address,
      has_roaches: form.hasRoaches,
      notes: form.notes,
    }]);
    setStatus(error ? "Error submitting" : "Report submitted!");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Apartment Address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
        className="border rounded p-2"
        required
      />
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.hasRoaches}
          onChange={(e) => setForm({ ...form, hasRoaches: e.target.checked })}
        />
        Roaches present
      </label>
      <textarea
        placeholder="Additional notes"
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
        className="border rounded p-2"
      />
      <button type="submit" className="bg-black text-white px-4 py-2 rounded">Submit</button>
      {status && <p>{status}</p>}
    </form>
  );
}
