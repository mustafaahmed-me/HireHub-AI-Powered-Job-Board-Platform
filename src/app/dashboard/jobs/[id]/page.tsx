// import ApplicationCard from "@/app/components/ApplicationCard";
import { ArrowDropDown } from "@mui/icons-material";

export default function jobs() {

    const recentApplications: any[] = [
    
        {contributerNames:"Ali Hassan", email:"ali@gmail.com", applyDate:"Applied 3 Apr 2026", message:"Shortlisted"},
        {contributerNames:"Sara Khan", email:"sara@gmail.com", applyDate:"Applied 2 Apr 2026", message:"Pending"},
        {contributerNames:"Umer Farooq", email:"umer@gmail.com", applyDate:"Applied 1 Apr 2026", message:"Accepted"},
        {contributerNames:"Fatima Malik", email:"fatima@gmail.com", applyDate:"Applied 31 Mar 2026", message:"Reviewed"}
    
    ];

    return (
        <>
            <h1 className="text-2xl font-bold ml-14 md:ml-0 mb-1.5 sm:mb-0">Applicants — Senior React Developer</h1>

            <div className="w-full">

                <h2 className="text-gray-400 pt-2.5">4 applicants</h2>

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
                                        <p className="font-bold text-lg">{app.contributerNames}</p>

                                        <p className="text-sm text-gray-500">{app.email} - {app.applyDate}</p>
                                    </div>

                                    <div className="flex justify-between border border-gray-300 px-2 py-1.5 w-50 cursor-text">

                                        <button className={`text-sm border px-3 py-1 rounded-lg font-bold md:mr-16 ${btnStyle}`}>{app.message}</button>

                                        <ArrowDropDown className="text-gray-500 cursor-pointer" />
                                    
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
