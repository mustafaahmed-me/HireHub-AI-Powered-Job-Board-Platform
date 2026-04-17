import { getUserApplications } from "../../../../actions/jobActions"; // Path confirm karlein
import { auth } from "@clerk/nextjs/server";

async function MyApplicationsPage() {

    const applications = await getUserApplications();
    const { userId } = await auth();

    const stats = [
        { 
            title: "Total Applications", 
            value: applications.length 
        },
        { 
            title: "Accepted", 
            value: applications.filter((app: any) => app.status === "ACCEPTED").length 
        },
        { 
            title: "Shortlisted", 
            value: applications.filter((app: any) => app.status === "SHORTLISTED").length 
        }
    ];

    return (
        <>
            <h1 className="text-2xl font-bold ml-14 md:ml-0 mb-1.5 sm:mb-0">My Applications</h1>

            {/* Stats Section */}
            <div className="flex flex-wrap gap-4 my-5">
                {stats.map((stat, index) => {
                    let textColor = "";
                    if (index === 0) textColor = "text-[#1e1b4b]";
                    else if (index === 1) textColor = "text-[#7c3aed]";
                    else if (index === 2) textColor = "text-[#059669]";

                    return (
                        <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 w-full sm:w-78">
                            <p className="text-sm text-gray-500">{stat.title}</p>
                            <p className={`text-3xl font-extrabold ${textColor}`}>{stat.value ?? 0}</p>
                        </div>
                    );
                })}
            </div>

            {/* Applications List */}
            <div className="w-full">
                <h2 className="font-semibold text-gray-700 pt-2.5">Recent Applications</h2>

                <div className="rounded-2xl mt-2 flex flex-col gap-3">
                    {applications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center my-40">
                            <h5 className="text-gray-400 text-4xl text-center">No Applications Yet...!</h5>
                        </div>
                    ) : (
                        applications.map((app: any) => {
                            let btnStyle = "";
                            
                            // Map database status to your UI styles
                            // Note: matching with your statusEnum: PENDING, REVIEWED, SHORTLISTED, REJECTED, ACCEPTED
                            if (app.status === "SHORTLISTED") {
                                btnStyle = "text-[#572a9c] border-[#572a9c] bg-[#ede9fe]";
                            } else if (app.status === "ACCEPTED") {
                                btnStyle = "text-[#059669] border-[#059669] bg-[#d1fae5]";
                            } else if (app.status === "REVIEWED") {
                                btnStyle = "text-[#2563eb] border-[#2563eb] bg-[#dbeafe]";
                            } else if (app.status === "REJECTED") {
                                btnStyle = "text-[#832424] border-[#832424] bg-[#fee2e2]";
                            } else {
                                // PENDING
                                btnStyle = "text-[#ca8a04] border-[#ca8a04] bg-[#fef9c3]";
                            }

                            return (
                                <div key={app.id} className="bg-white py-3.75 px-4 flex justify-between flex-wrap gap-2.5 items-center rounded-xl shadow-sm border border-gray-50">
                                    <div>
                                        <p className="font-medium text-lg">{app.jobTitle || "Job Title"}</p>
                                        <p className="text-sm text-gray-500">
                                            {app.company} — {app.location} — {new Date(app.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                                        </p>
                                    </div>

                                    <div className="w-25 mr-0 md:mr-16">
                                        <button className={`text-sm border px-3 py-1 rounded-lg font-bold w-full uppercase ${btnStyle}`}>
                                            {app.status.toLowerCase()}
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

export default MyApplicationsPage
