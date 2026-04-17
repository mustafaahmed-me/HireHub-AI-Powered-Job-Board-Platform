"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getEmployerJobs } from "../../../actions/jobActions";

function Employer() {
    const [myJobs, setMyJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            const data = await getEmployerJobs();
            setMyJobs(data);
            setLoading(false);
        };
        fetchJobs();
    }, []);

    // Stats based on posted jobs
    const stats = [
        { title: "Total Jobs Posted", value: myJobs.length },
        { title: "Active Jobs", value: myJobs.filter(j => j.isActive).length },
        { title: "Closed Jobs", value: myJobs.filter(j => !j.isActive).length }
    ];

    if (loading) return <div className="text-2xl text-center my-50">Loading Employer Data...!</div>;

    return (
        <>
            <div className="flex flex-wrap gap-4 my-5">
                {stats.map((stat, index) => {
                    let textColor = index === 0 ? "text-[#1e1b4b]" : index === 1 ? "text-[#7c3aed]" : "text-[#059669]";
                    return (
                        <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 w-full sm:w-78">
                            <p className="text-sm text-gray-500">{stat.title}</p>
                            <p className={`text-3xl font-extrabold ${textColor}`}>{stat.value}</p>
                        </div>
                    );
                })}
            </div>

            <div className="w-full">
                <h2 className="font-semibold text-gray-700 pt-2.5">My Recent Posted Jobs</h2>
                <div className="rounded-2xl mt-2 flex flex-col gap-3">
                    {myJobs.length === 0 ? (
                        <h5 className="text-gray-400 text-4xl text-center my-40">DATA NOT FOUND...!</h5>
                    ) : (
                        myJobs.map((job) => {
                            let statusStyle = job.isActive 
                                ? "text-[#059669] bg-[#d1fae5] border-[#059669]" 
                                : "text-[#832424] bg-[#fee2e2] border-[#832424]";

                            return (
                                <div key={job.id} className="bg-white py-4 px-5 flex justify-between flex-wrap gap-5 items-center rounded-xl shadow-sm">
                                    <div>
                                        <p className="font-medium text-lg">{job.title}</p>
                                        <p className="text-sm text-gray-500">{job.location} - {job.jobType.replace('_', ' ')}</p>
                                        <p className="text-xs text-blue-500 mt-1">Posted on {new Date(job.createdAt).toLocaleDateString()}</p>
                                    </div>

                                    <div className="flex items-center gap-3 flex-wrap">
                                        <span className={`text-xs border px-3 py-1 rounded-full font-bold ${statusStyle}`}>
                                            {job.isActive ? "Active" : "Closed"}
                                        </span>

                                        <Link 
                                            href={`/dashboard/jobs/${job.id}`}
                                            className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded-lg font-semibold hover:bg-blue-700 transition"
                                        >
                                            View Applicants
                                        </Link>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </>
    );
}

export default Employer;