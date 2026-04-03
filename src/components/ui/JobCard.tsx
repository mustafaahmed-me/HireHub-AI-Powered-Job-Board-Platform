import type { Job } from "@/app/type/job";

export default function JobCard({ job }: { job: Job }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100">

      <h3 className="text-xl font-semibold text-gray-800">
        {job.title}
      </h3>

      <p className="text-gray-500 mt-1">{job.company}</p>

      <div className="text-sm text-gray-500 mt-3 space-y-1">
        <p>📍 {job.location}</p>
        <p>💼 {job.type}</p>
      </div>

      <p className="text-green-600 font-bold mt-3">
        {job.salary}
      </p>

      <button className="mt-5 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition">
        Apply Now
      </button>

    </div>
  );
}