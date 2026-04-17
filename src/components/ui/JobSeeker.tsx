"use client";

import { useEffect, useState } from "react";
import { getUserApplications } from "../../../actions/jobActions";

function JobSeeker() {
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getUserApplications();
            setApplications(data);
            setLoading(false);
        };
        fetchData();
    }, []);

    // Dynamic Stats calculation
    const stats = [
        { title: "Total Applications", value: applications.length },
        { title: "Accepted", value: applications.filter(a => a.status === 'ACCEPTED').length },
        { title: "Shortlisted", value: applications.filter(a => a.status === 'SHORTLISTED').length }
    ];

    if (loading) return <div className="text-2xl text-center my-50">Loading Seeker Data...!</div>;

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
                <h2 className="font-semibold text-gray-700 pt-2.5">Recent Applications</h2>
                <div className="rounded-2xl mt-2 flex flex-col gap-3">
                    {applications.length === 0 ? (
                        <h5 className="text-gray-400 text-4xl text-center my-40">DATA NOT FOUND...!</h5>
                    ) : (
                        applications.map((app) => {
                            let btnStyle = "";
                            // Status mapping based on your Enum
                            if (app.status === "SHORTLISTED") btnStyle = "text-[#572a9c] border-[#572a9c] bg-[#ede9fe]";
                            else if (app.status === "ACCEPTED") btnStyle = "text-[#059669] border-[#059669] bg-[#d1fae5]";
                            else if (app.status === "REVIEWED") btnStyle = "text-[#2563eb] border-[#2563eb] bg-[#dbeafe]";
                            else if (app.status === "REJECTED") btnStyle = "text-red-600 border-red-600 bg-red-50";
                            else btnStyle = "text-[#ca8a04] border-[#ca8a04] bg-[#fef9c3]"; // Pending

                            return (
                                <div key={app.id} className="bg-white py-4 px-4 flex justify-between flex-wrap items-center rounded-xl shadow-sm">
                                    <div>
                                        <p className="font-medium">{app.jobTitle || "Position"}</p>
                                        <p className="text-sm text-gray-500">
                                            {app.company} - {app.location} - {new Date(app.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="w-25 mr-0 md:mr-16">
                                        <button className={`text-xs border px-3 py-1 rounded-lg font-bold w-full uppercase ${btnStyle}`}>
                                            {app.status}
                                        </button>
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

export default JobSeeker;