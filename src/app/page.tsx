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
        className="relative text-white px-6 md:px-20 py-24 md:py-40 flex items-center h-[65vh] overflow-hidden"
        style={{
          backgroundImage: "url('/img1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Modern Overlay: Dark to Transparent Gradient */}
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/80 to-transparent" />

        {/* Ambient Background Glows (For VIP look) */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-60 h-60 bg-indigo-600/10 rounded-full blur-[100px]" />

        <div className="relative z-10 w-[95%] max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          
          {/* LEFT SIDE: Typography & Branding */}
          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 mb-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              <span className="text-[8px] md:text-[10px] font-medium tracking-widest uppercase text-blue-300">New Opportunities Live</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.1]">
              Find Your <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
                Dream Job.
              </span>
            </h2>
            
            <p className="text-gray-400 text-sm max-w-lg leading-relaxed font-medium">
              Don&apos;t just search for work. Build a career that defines you. Join the elite network of professionals.
            </p>

            {/* Trust Badges or Stats */}
            <div className="pt-4 flex flex-wrap justify-center md:justify-start gap-6 opacity-60">
              <div className="text-sm font-bold">10k+ <span className="font-normal block text-xs">Active Jobs</span></div>
              <div className="text-sm font-bold">500+ <span className="font-normal block text-xs">Top Companies</span></div>
              <div className="text-sm font-bold">24/7 <span className="font-normal block text-xs">Expert Support</span></div>
            </div>
          </div>

          {/* RIGHT SIDE: VIP Circular CTA Card */}
          <div className="relative group">
            {/* Decorative Rotating Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/20 animate-[spin_20s_linear_infinite]" />
            
            <Link href="/Profile/form">
              <div className="relative w-40 h-40 md:w-44 md:h-44 bg-white/5 backdrop-blur-xl rounded-full flex flex-col items-center justify-center text-center p-8 border border-white/20 shadow-[0_0_50px_rgba(37,99,235,0.3)] transition-all duration-700 hover:bg-white/10 hover:border-blue-500/50 group">
                
                {/* Inner Floating Icon */}
                <div className="mb-4 w-10 h-10 bg-blue-600 rounded-2xl rotate-12 flex items-center justify-center shadow-lg transition-transform group-hover:rotate-0 group-hover:scale-110 duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>

                <h3 className="text-sm font-bold tracking-tight">Create Profile</h3>
                <p className="text-[8px] text-blue-300 mt-1 uppercase tracking-widest font-bold">Get Started Now</p>
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-full bg-blue-500/0 group-hover:bg-blue-500/5 transition-all duration-500" />
              </div>
            </Link>
            
            {/* Small floating elements */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center animate-bounce shadow-xl">
              <span className="text-white text-lg">🚀</span>
            </div>
          </div>

        </div>
      </section>

      {/* Job Categories Section */}
     <section className="bg-gray-100 flex justify-center py-10 md:py-16">
        {/* Width ko responsive kiya: mobile par 90% aur laptops par 85% */}
        <div className="w-[90%] lg:w-[85%]">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-8 md:mb-10 text-center md:text-left">
            Latest Opportunities
          </h3>
          
          {jobs.length === 0 ? (
            <div className="px-4">
              <p className="text-center text-gray-500 mt-10 text-xl md:text-2xl mb-2 font-bold">
                No jobs Found
              </p>
              <p className="text-center text-gray-500 font-semibold text-xs md:text-sm">
                There are currently no job postings available. Please check back later.
              </p>
            </div>
          ) : (
            /* Grid: default 1 column (mobile), md par 2 columns, aur lg par 3 columns (optional) */
            <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
              {jobs.map((job: Job) => (
                <MainJobCard jobData={job} key={job.id} />
              ))}
            </div>
          )}

          <div className="w-full text-center mt-10">
            <Link href={"/joblistingpage"} className="text-blue-800 hover:underline">
              See more jobs ➡️
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
