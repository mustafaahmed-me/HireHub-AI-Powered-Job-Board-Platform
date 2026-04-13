import Link from "next/link";
import { getJobs } from "../../../../actions/jobActions";
import { Badge } from "@/components/ui/badge";
import { auth } from "@clerk/nextjs/server";
import DeleteJobButton from "@/components/ui/DeleteJobButton";

export default async function MyPostedJobsPage() {

    const allJobs = await getJobs();
    // console.log(allJobs);
    
    const { userId } = await auth();

    const myJobs = allJobs.filter((job: any) => job.userId === userId);

    // Ye do lines add karein:
    const activeJobsCount = myJobs.filter((job: any) => job.isActive).length;
    const closedJobsCount = myJobs.filter((job: any) => !job.isActive).length;

    return (
        <>
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold ml-14 md:ml-0 mb-1.5 sm:mb-0">My Posted Jobs</h1>
                <Link href={'/post-a-job'}>
                    <button className='text-sm rounded-lg py-1.5 px-3.5 cursor-pointer transition bg-[#4f46e5] text-white'>
                        New Post +
                    </button>
                </Link>
            </div>

            <div className="flex flex-wrap gap-4 my-5">
                <div className="bg-white border border-gray-200 rounded-xl p-4 w-full sm:w-78">
                    <p className="text-sm text-gray-500">Total Jobs Posted</p>
                    <p className="text-3xl font-extrabold text-[#1e1b4b]">{myJobs.length}</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-4 w-full sm:w-78">
                    <p className="text-sm text-gray-500">Total Active Jobs</p>
                    <p className="text-3xl font-extrabold text-[#059669]">{activeJobsCount}</p>
                </div>
        
                <div className="bg-white border border-gray-200 rounded-xl p-4 w-full sm:w-78">
                    <p className="text-sm text-gray-500">Total Closed Jobs</p>
                    <p className="text-3xl font-extrabold text-[#ff4b4b]">{closedJobsCount}</p>
                </div>
            </div>

            <div className="w-full">
                <h2 className="font-semibold text-gray-700 pt-2.5">My Recent Posted Jobs</h2>
                <div className="rounded-2xl mt-2 flex flex-col gap-3">
                    {myJobs.length === 0 ? (
                        <h5 className="text-gray-400 text-4xl text-center my-40">No Jobs Posted Yet...!</h5>
                    ) : (
                        myJobs.map((app: any) => (
                            <div key={app.id} className="bg-white py-4 px-5 flex justify-between flex-wrap gap-5 items-center rounded-xl border border-gray-100">
                                <div>
                                    <p className="font-bold text-xl">{app.title}</p>
                                    <p className="text-sm text-gray-500">{app.jobType} - {app.company}</p>
                                    <p className="text-sm text-blue-500"><span className="text-gray-700">Location:</span> {app.location}</p>
                                </div>

                                <div className="flex justify-center gap-3 flex-wrap items-center">
                                    <Badge variant={app.isActive ? "success" : "secondary"}>
                                        {app.isActive ? "Active" : "Inactive"}
                                    </Badge>
    
                                    <Link href={`/dashboard/jobs/${app.id}`}>
                                        <button className="text-sm border px-3 py-1.5 rounded-lg font-semibold cursor-pointer bg-blue-500 text-white">
                                            View Applicants
                                        </button>
                                    </Link>

                                    <DeleteJobButton jobId={app.id} />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
