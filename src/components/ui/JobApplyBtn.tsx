"use client"

import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface ApplyBtnProps{
    url: string | null | undefined
}

const JobApplyBtn = ({url} : ApplyBtnProps) => {
    const {userId} =  useAuth()
    const router = useRouter()

    function applyForJob(){
        if(!url){
            toast.error("There is no link availabel.")
            return
        }
        if(!userId){
            toast.error("Please login to apply.")
            router.push("/sign-in")
            return 
        }
        const finalUrl = url.startsWith('http') ? url : `https://${url}`;
        window.open(finalUrl, "_blank", "noopener,noreferrer");    
    }

  return (
    <>
        <button onClick={applyForJob} className="rounded-lg! py-2! w-full bg-blue-600 text-white cursor-pointer">Apply Now</button>
    </>
  )
}

export default JobApplyBtn