"use client";

type FilterBarProps = {
  search: string;
  setSearch: (val: string) => void;
  location: string;
  setLocation: (val: string) => void;
  jobType: string;
  setJobType: (val: string) => void;
};

export default function FilterBar({
  search,
  setSearch,
  location,
  setLocation,
  jobType,
  setJobType,
}: FilterBarProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-200">

        {/* Title search */}
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Location */}
        <input
          type="text"
          placeholder="📍 Location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="flex-1 p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Job type dropdown */}
        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
        >
          <option value="">💼 All Types</option>
          <option value="FULL_TIME">Full Time</option>
          <option value="PART_TIME">Part Time</option>
          <option value="REMOTE">Remote</option>
          <option value="CONTRACT">Contract</option>
          <option value="INTERNSHIP">Internship</option>
        </select>

      </div>
    </div>
  );
}
