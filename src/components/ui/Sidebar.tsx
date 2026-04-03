import type { Dispatch, SetStateAction } from "react";

type SidebarProps = {
  setJobType: Dispatch<SetStateAction<string>>;
  jobType: string;
};

export default function Sidebar({ setJobType, jobType }: SidebarProps) {
  const buttonStyle = (type: string) =>
    `w-full text-left px-3 py-2 rounded-lg transition ${
      jobType === type ? "bg-blue-600 text-white" : "hover:bg-gray-200"
    }`;

  return (
    <div className="w-64 bg-white p-5 shadow-md h-screen">
      <h2 className="text-xl font-bold mb-6">Filters</h2>
      <div className="space-y-2">
        <button onClick={() => setJobType("")} className={buttonStyle("")}>All</button>
        <button onClick={() => setJobType("Full-time")} className={buttonStyle("Full-time")}>Full-time</button>
        <button onClick={() => setJobType("Part-time")} className={buttonStyle("Part-time")}>Part-time</button>
      </div>
    </div>
  );
}





