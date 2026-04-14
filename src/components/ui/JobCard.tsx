
import type { Job } from "@/lib/schema";
import Link from "next/link";


const jobTypeConfig: Record<string, { label: string; className: string }> = {
  FULL_TIME:   { label: "Full-time",   className: "bg-blue-50 text-blue-700" },
  PART_TIME:   { label: "Part-time",   className: "bg-purple-50 text-purple-700" },
  CONTRACT:    { label: "Contract",    className: "bg-amber-50 text-amber-700" },
  REMOTE:      { label: "Remote",      className: "bg-teal-50 text-teal-700" },
  INTERNSHIP:  { label: "Internship",  className: "bg-pink-50 text-pink-700" },
};

export default function JobCard({ job }: { job: Job }) {
  const typeConfig = jobTypeConfig[job.jobType] ?? {
    label: job.jobType,
    className: "bg-gray-100 text-gray-600",
  };


  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col min-h-70 hover:shadow-lg transition-shadow duration-200">

      {/* Header — badge + job type */}
      <div className="flex items-center justify-between">
        <span className={`inline-block text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full ${typeConfig.className}`}>
          {typeConfig.label}
        </span>
      </div>

      {/* Title & Company */}
      <div className="mt-3 flex-1">
        <h3 className="text-[15px] font-semibold text-gray-900 leading-snug line-clamp-2">
          {job.title}
        </h3>
        <p className="mt-1 text-[13px] font-medium text-gray-500 truncate">
          {job.company}
        </p>

        {/* Location & Job Type */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-[13px] text-gray-400">
            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M8 8.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
              <path d="M8 1.5C5.5 1.5 3.5 3.4 3.5 5.8c0 3.4 4.5 8.7 4.5 8.7s4.5-5.3 4.5-8.7C12.5 3.4 10.5 1.5 8 1.5z"/>
            </svg>
            <span className="truncate">{job.location}</span>
          </div>

          <div className="flex items-center gap-2 text-[13px] text-gray-400">
            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="1.5" y="4.5" width="13" height="9" rx="1.5"/>
              <path d="M5 4.5V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1.5"/>
            </svg>
            <span>{jobTypeConfig[job.jobType]?.label ?? job.jobType}</span>
          </div>
        </div>
      </div>

      {/* Salary + Button */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[11px] text-gray-400 uppercase tracking-widest font-medium mb-0.5">
              Monthly Salary
            </p>
            <p className="text-[18px] font-bold text-green-600 tracking-tight leading-none">
              {job.salary}
            </p>
          </div>

          <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center">
            <svg className="w-4 h-4 text-green-600" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="8" cy="8" r="6.5"/>
              <path d="M8 4.5v7M5.5 6.5c0-1.1.9-2 2.5-2s2.5.9 2.5 2c0 2.5-5 2.5-5 5h5"/>
            </svg>
          </div>
        </div>

        <Link
          href={`/joblistingpage/${job.id}`}
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-semibold tracking-wide text-center py-2.5 rounded-xl transition-colors duration-150"
        >
          View Details →
        </Link>
      </div>

    </div>
  );
}