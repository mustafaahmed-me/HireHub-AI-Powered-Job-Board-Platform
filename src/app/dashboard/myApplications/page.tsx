// import ApplicationCard from "@/app/components/ApplicationCard";

export default function MyApplicationsPage() {

    const stats = [
        { title: "Total Applications", value: 8 },
        { title: "Accepted", value: 3 },
        { title: "Shortlisted", value: 1 }
    ];

    const recentApplications: any[] = [
    
        {jobTitle: "Frontend Developer", status: "Systems Ltd", city: "Karachi", date: "2 Apr", message: "Shortlisted"},
        {jobTitle: "React Engenior", status: "Systems Ltd", city: "Remote", date: "30 Mar", message: "Accepted"},
        {jobTitle: "UI Developer", status: "Systems Ltd", city: "Lahore", date: "28 Mar", message: "Reviewed"},
        {jobTitle: "Next.js Developer", status: "Systems Ltd", city: "Remote", date: "25 Mar", message: "Pending"},
        {jobTitle: "Full Stack Engineer", status: "Mega Crop", city: "Islamabad", date: "20 Mar", message: "Rejected"}
    
    ];

    return (
        <>
            <h1 className="text-2xl font-bold ml-14 md:ml-0 mb-1.5 sm:mb-0">My Applications</h1>

            <div className="flex flex-wrap gap-4 my-5">

                {stats.map((stat, index) => {

                    let textColor = "";

                    if (index === 0) {
                      textColor = "text-[#1e1b4b]";
                    }
                    else if (index === 1) {
                      textColor = "text-[#7c3aed]";
                    }
                    else if (index === 2) {
                      textColor = "text-[#059669]";
                    }

                    return (

                        <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 w-full sm:w-78">
                            <p className="text-sm text-gray-500">{stat.title}</p>

                            <p className={`text-3xl font-extrabold ${textColor}`}>{stat.value ?? 0}</p>
                        </div>

                    );

                })}

            </div>

            <div className="w-full">

                <h2 className="font-semibold text-gray-700 pt-2.5">Recent Applications</h2>

                <div className="rounded-2xl mt-2 flex flex-col gap-3">

                    {recentApplications.length === 0 ? (

                        <h5 className="text-gray-400 text-4xl text-center my-40">No Applications Yet...!</h5>

                    ) : (

                        recentApplications.map((app, index) => {

                            let btnStyle = "";

                            if (app.message === "Shortlisted") {
                                btnStyle ="text-[#572a9c] border-[#572a9c] bg-[#ede9fe]";
                            }
                            else if (app.message === "Accepted") {
                                btnStyle ="text-[#059669] border-[#059669] bg-[#d1fae5]";
                            }
                            else if (app.message === "Reviewed") {
                                btnStyle ="text-[#2563eb] border-[#2563eb] bg-[#dbeafe]";
                            }
                            else if (app.message === "Pending") {
                                btnStyle ="text-[#ca8a04] border-[#ca8a04] bg-[#fef9c3]";
                            }
                            else if (app.message === "Rejected") {
                                btnStyle ="text-[#832424] border-[#832424] bg-[#fee2e2]";
                            }

                            return (

                                <div key={index} className="bg-white py-3.75 px-4 flex justify-between flex-wrap gap-2.5 items-center rounded-xl">

                                    <div>
                                        <p className="font-medium">{app.jobTitle}</p>

                                        <p className="text-sm text-gray-500">{app.status} - {app.city} - {app.date}</p>
                                    </div>

                                    <div className="w-25 mr-0 md:mr-16">

                                        <button className={`text-sm border px-3 py-1 rounded-lg font-bold cursor-pointer ${btnStyle}`}>{app.message}</button>
                                    
                                    </div>

                                </div>

                            );

                        })

                    )}

                </div>

            </div>
        </>
    )

}
