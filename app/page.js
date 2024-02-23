"use client";
import React, { useEffect, useState } from "react";

export default function App() {
  const [locations, setLocations] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchLocations();
  }, []);

  async function fetchLocations() {
    try {
      const response = await fetch(
        "https://efbdpjvnpulvomzjmpfz.supabase.co/functions/v1/rest-interview"
      );
      const { locations } = await response.json();
      setLocations(locations);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-bold mt-10 text-center text-3xl">Find Location</h1>
      <div className="mt-20 text-center text-lg"> Welcome to the home page!</div>
      <div className="relative flex flex-5"></div>
      <input
        type="text"
        className="w-100 border border-grey-500 text-sm outline-100 rounded-sm mt-10 italic py-2 px-2"
        placeholder="Enter location name"
        value={filter}
        onChange={(text) => setFilter(text.target.value)}
      />
      <table className="text-smborder-collapse border mt-5 border-slate-500">
        <thead>
          <tr>
            <th className="text-md  border border-slate-600">No</th>
            <th className="text-md border border-slate-600">Name</th>
            <th className="text-md  border border-slate-600">Address</th>
            <th className="text-md border border-slate-600">Is Permanent</th>
          </tr>
        </thead>
        <tbody>
          {filteredLocations.map((location, index) => (
            <tr key={index}>
              <td className="text-md pr-5 pl-4 border border-slate-600">{index+1}</td>
              <td className="text-md pb-2 pt-2 pr-4 border border-slate-600">{location.name}</td>
              <td className="text-md pr-4 border border-slate-600">{location.address}</td>
              <td className="text-md pr-5 pl-1 border border-slate-600">{location.isPermanent ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}