"use client";

import { useState, useMemo } from "react";
import Sidebar from "@/components/ui/Sidebar";
import JobCard from "@/components/ui/JobCard";
import { jobs } from "@/app/data/job";

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("");

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      return (
        job.title.toLowerCase().includes(search.toLowerCase()) &&
        (jobType === "" || job.type === jobType)
      );
    });
  }, [search, jobType]);

  return (
    <div className="bg-gray-100 min-h-screen flex">

      <Sidebar setJobType={setJobType} jobType={jobType} />

      <div className="flex-1 p-8">

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search jobs..."
            className="w-full p-4 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <JobCard key={index} job={job} />
            ))
          ) : (
            <p className="text-gray-500">No jobs found</p>
          )}
        </div>

      </div>
    </div>
  );
}