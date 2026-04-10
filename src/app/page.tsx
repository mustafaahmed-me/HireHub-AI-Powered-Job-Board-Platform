import MainJobCard from "@/components/ui/MainJobCard";
import { getJobsForHomePage } from "../../actions/jobActions";
import { Job } from "@/lib/schema";
import Link from "next/link";

export default async function Home() {

  const jobs = await getJobsForHomePage();

  return (
    <>

      {/* Hero Section */}
      <section
        className="relative text-white px-6 md:px-16 py-20 md:py-32 flex items-center min-h-120"
        style={{
          backgroundImage: "url('/img1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Text + Search */}
        <div className="relative z-10 max-w-xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-3">
            Find Your Dream Job
          </h2>
          <p className="text-gray-200 mb-8 text-sm md:text-base">
            Your next career move starts here. Explore thousands of job opportunities.
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-lg flex flex-col md:flex-row overflow-hidden shadow-lg w-full md:w-140">
            <div className="flex items-center flex-1 px-3 border-b md:border-b-0 md:border-r border-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400 mr-2 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              <input
                type="text"
                placeholder="Job Title or Keyword"
                className="flex-1 py-3 text-black text-sm outline-none"
              />
            </div>
            <div className="flex items-center flex-1 px-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400 mr-2 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <input
                type="text"
                placeholder="Location"
                className="flex-1 py-3 text-black text-sm outline-none"
              />
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 text-sm font-medium transition-colors">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Job Categories Section */}
      <section className="bg-gray-100 flex justify-center py-16">
        <div className="w-[85%]">
          <h3 className="text-2xl font-semibold text-gray-800 mb-10">Latest Opportunities</h3>
          {jobs.length === 0 ? (
            <div>
              <p className="text-center text-gray-500 mt-10 text-2xl mb-2 font-bold">No jobs Found</p>
              <p className="text-center text-gray-500 font-semibold text-sm">There are currently no job postings available. Plese check back later.</p>
            </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2">
              {jobs.map((job : Job) => (<MainJobCard jobData={job} key={job.id} />))}
            </div>
            ) 
          }
          <div className="w-full text-center mt-10">
            <Link href={"/joblistingpage"} className="mt-10 text-blue-800 text-center">See more jobs ➡️</Link>
          </div>
        </div>
      </section>
    </>
  );
}
