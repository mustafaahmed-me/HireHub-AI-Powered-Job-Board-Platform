
"use client";
import { useEffect, useMemo, useState } from "react";
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
    const data = await getJobs();
    setJobs(data || []);
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const searchTerm = search.trim().toLowerCase();
      const locationTerm = location.trim().toLowerCase();

      const matchesSearch = searchTerm
        ? [job.title, job.company, job.description]
            .join(" ")
            .toLowerCase()
            .includes(searchTerm)
        : true;

      const matchesLocation = locationTerm
        ? job.location.toLowerCase().includes(locationTerm)
        : true;

      const matchesJobType = jobType ? job.jobType === jobType : true;

      return matchesSearch && matchesLocation && matchesJobType;
    });
  }, [jobs, search, location, jobType]);

  const paginatedJobs = useMemo(() => {
    const startIndex = (page - 1) * PAGE_SIZE;
    return filteredJobs.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredJobs, page]);

  useEffect(() => {
    setPage(1);
  }, [search, location, jobType]);

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    setHasMore(filteredJobs.length > page * PAGE_SIZE);
  }, [filteredJobs, page]);

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
            {paginatedJobs.length > 0 ? (
              paginatedJobs.map((job) => (
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



