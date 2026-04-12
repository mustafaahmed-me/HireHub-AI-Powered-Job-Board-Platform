"use client";

import { useState } from "react";

import Employer from "@/components/ui/Employer";
import JobSeeker from "@/components/ui/JobSeeker";


export default function DashboardOverviewPage() {

  const [activeView, setActiveView] = useState("jobseeker");

  return (
    <>
    
      <div className="flex justify-between flex-wrap">

        <h1 className="text-2xl font-bold ml-14 md:ml-0 mb-1.5 sm:mb-0">Dashboard — Overview</h1>

        <div className="flex gap-2 pl-14 sm:pl-0">

          <button onClick={() => setActiveView("jobseeker")} 
            className={`text-sm rounded-lg py-0.5 px-2 cursor-pointer transition 
              ${ activeView === "jobseeker" ? "bg-[#4f46e5] text-white" : "bg-[#ede9fe] text-gray-400 hover:text-black"}
            `}
          >Job Seeker</button>

          <button onClick={() => setActiveView("employer")}
            className={`text-sm rounded-lg py-0.5 px-2 pr-6 cursor-pointer transition
              ${ activeView === "employer" ? "bg-[#4f46e5] text-white" : "bg-[#ede9fe] text-gray-400 hover:text-black"} 
            `}
          >Employer</button>

        </div>

      </div>

      {activeView === "jobseeker" && (

        <JobSeeker />

      )}

      {activeView === "employer" && (

        <Employer />

      )}

    </>
  );

}
