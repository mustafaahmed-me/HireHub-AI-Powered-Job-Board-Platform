import { getJobsWithMatchScore } from "../../../actions/jobActions";
import { Badge } from "@/components/ui/badge";



const AiMatchScore = async ({ jobDetails }: { jobDetails: any }) => {
  const aiFeatureMatchScore = await getJobsWithMatchScore();
  return (
     <div  className="flex items-center gap-2 text-md ">
        <p>
            AI Match Score:
        </p>
        <Badge variant="success" className="font-medium flex gap-2 cursor-pointer active:scale-95">
            {aiFeatureMatchScore.find(job => job.id === jobDetails.id)?.matchScore ?? 0}% Match
        </Badge>
    </div>

  )
}

export default AiMatchScore
