import Link from "next/link";

export default function MyPostedJobsPage() {

  const stats = [
        { title: "Total Applications", value: 8 },
        { title: "Accepted", value: 3 },
        { title: "Shortlisted", value: 1 }
    ];

    const recentApplications: any[] = [
    
        {jobTitle: "Senior React Developer", job: "Remote", time: "Full Time", applications: "12 applications", message: "Active"},
        {jobTitle: "UI/UX Designer", job: "Karachi", time: "Part Time", applications: "7 applications", message: "Active"},
        {jobTitle: "Node.js Backend Dev", job: "Lahore", time: "Countact", applications: "5 applications", message: "closed"}
    
    ];

    return (
        <>
          <h1 className="text-2xl font-bold ml-14 md:ml-0 mb-1.5 sm:mb-0">My Posted Jobs</h1>

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

                <h2 className="font-semibold text-gray-700 pt-2.5">My Recent Posted Jobs</h2>

                <div className="rounded-2xl mt-2 flex flex-col gap-3">

                    {recentApplications.length === 0 ? (

                        <h5 className="text-gray-400 text-4xl text-center my-40">No Applications Yet...!</h5>

                    ) : (

                        recentApplications.map((app, index) => {

                            let btnStyle = "";

                            if (app.message === "Active") {
                                btnStyle ="text-[#059669] bg-[#d1fae5]";
                            }
                            else if (app.message === "closed") {
                                btnStyle ="text-[#832424] bg-[#fee2e2]";
                            }

                            return (

                                <div key={index} className="bg-white py-3.75 px-5 flex justify-between flex-wrap gap-5 items-center rounded-xl">

                                    <div>
                                        <p className="font-medium">{app.jobTitle}</p>

                                        <p className="text-sm text-gray-500">{app.job} - {app.time}</p>

                                        <p className="text-sm text-blue-500">{app.applications}</p>
                                    </div>

                                    <div className="flex justify-center gap-3 flex-wrap w-55 mr-0 lg:mr-10">

                                        <button className={`text-sm border px-3 py-1 rounded-full font-bold ${btnStyle}`}>{app.message}</button>

                                        <button className={`text-sm border px-3 py-1 rounded-lg font-semibold cursor-pointer bg-blue-500 text-white }`}><Link href={'/dashboard/applicants/1'}>view Applicants</Link></button>

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
