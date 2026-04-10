import { Job } from "@/lib/schema"
import { Card, CardContent} from "@/components/ui/card"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { BookMarked, MapPin } from "lucide-react"
import { success } from "zod"


interface JobCardProps{
    jobData : Job
}

const MainJobCard = async ({jobData} : JobCardProps) => {
  return (
    <div>
        <Card className="p-5">
            <CardContent>
                <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                        <Link href={`/joblistingpage/${jobData.id}`}>
                            <p className="font-semibold md:text-xl lg:text-2xl leading-tight pb-3">{jobData.title}</p>
                        </Link>
                        <p className="flex gap-2 items-center">🏢 &nbsp;{jobData.company}</p>
                        <p className="flex gap-2.5 items-center"><MapPin className="h-4 w-4" />{jobData.location}</p>
                    </div>
                    <div>
                        <Badge variant="success">{jobData.isActive ? "Active" : "Closed"}</Badge>
                    </div>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-4 border-b pb-4.5">
                    <Badge className="text-[11px] tracking-wider font-heading" variant={"secondary"}>📆 {jobData.jobType}</Badge>
                    <Badge className="text-[11px] tracking-wider font-heading" variant={"secondary"}>🌟 {jobData.experienceLevel}</Badge>
                    <Badge className="text-[11px] tracking-wider font-heading" variant={"secondary"}>💵 {jobData.salary ? jobData.salary : "Competitive"}</Badge>
                </div>

                <div className="pt-4.5 flex flex-col gap-4 border-b pb-4.5">
                    <p>📄 About the role</p>
                    <p className="text-gray-600 w-[90%]">{jobData.description}</p>
                </div>
                
                <div className="pt-4.5 flex flex-col gap-4 border-b pb-4.5">
                    <p>🛠️ Required Skills</p>
                    <div className="flex flex-wrap gap-4">
                        {jobData.skills?.map((skill,index) => (
                            <Badge variant={"success"} key={index}>{skill}</Badge>
                        ))}
                    </div>
                </div>
                <div className="pt-4.5 flex justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <p className="flex">🕜 Posted at</p>
                        <p className="text-gray-600">{new Date(jobData.createdAt).toLocaleDateString("en-Pk",{
                            day: "2-digit",
                            month : "short",
                            year : "numeric"
                        })}</p>
                    </div>
                    <div>
                        <Badge className=" font-medium flex gap-2 cursor-pointer active:scale-95">
                            <p>Save</p>
                            <BookMarked className="h-4 w-4"></BookMarked>
                        </Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}

export default MainJobCard