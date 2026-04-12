
"use client";
import { useEffect, useState } from "react";
import { getJobs } from "../../../actions/jobActions";
import JobCard from "@/components/ui/JobCard";
import FilterBar from "@/components/ui/filterBar";
import Pagination from "@/components/ui/pagination";

import { Job } from "@/lib/schema";

const PAGE_SIZE = 6;

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchJobs = async () => {
    const data = await getJobs({
      search,
      location,
      jobType,
      page,
      pageSize: PAGE_SIZE,
    });

    setJobs(data || []);
    setHasMore((data?.length ?? 0) === PAGE_SIZE);
  };

  // Filter change hone par page 1 reset
  useEffect(() => {
    setPage(1);
  }, [search, location, jobType]);

  useEffect(() => {
    fetchJobs();
  }, [search, location, jobType, page]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex">

        
    
        {/* Main Content */}
        <div className="flex-1 p-6">

          {/* FilterBar */}
          <FilterBar
            search={search}
            setSearch={setSearch}
            location={location}
            setLocation={setLocation}
            jobType={jobType}
            setJobType={setJobType}
          />

          {/* Jobs Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))
            ) : (
              <p className="text-gray-500 col-span-3">No jobs found</p>
            )}
          </div>

          {/* Pagination */}
          <Pagination page={page} setPage={setPage} hasMore={hasMore} />

        </div>
      </div>
    </div>
  );
}