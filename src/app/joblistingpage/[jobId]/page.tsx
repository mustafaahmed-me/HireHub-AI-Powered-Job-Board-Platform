import { Box, Button, Avatar } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import TwoWheelerSharpIcon from '@mui/icons-material/TwoWheelerSharp';
import { jobs } from '@/lib/schema';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { Badge } from '@/components/ui/badge';
import JobApplyBtn from "@/components/ui/JobApplyBtn";

async function Home({params} : {params : {jobId : string}}) {
  const {jobId} = await params;

  const jobDetail = await db.query.jobs.findFirst({
    where: eq(jobs.id,jobId)
  })
  
  return (
    <>
      <div className="w-[90%] sm:w-[80%] lg:w-[70%] mx-auto space-y-6 py-10">

        <Box className="bg-[#fafafa] rounded-xl shadow-sm p-6 flex flex-col md:flex-row justify-between gap-3">

          <div className="space-y-4 w-full">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 pt-5">{jobDetail?.title}</h1>
              <div>
                <Badge className='sm:mt-4 flex gap-2 items-center' variant={"success"}>
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  {jobDetail?.isActive ? "Active" : "Closed"}
                </Badge>     
                <p className="text-gray-600 mt-2">{jobDetail?.createdAt ? new Date(jobDetail.createdAt).toLocaleDateString("en-Pk",{
                  day: "2-digit",
                  month : "short",
                  year : "numeric"
                  }) : "Data not availabel"}
                </p>         
              </div>
            </div>

            <div className='flex flex-wrap gap-3 text-xl font-semibold items-center'>
              <p>🏢 {jobDetail?.company}</p>    
            </div>
    
            <div className="flex flex-wrap gap-6 text-gray-500 text-md items-center">

              <div className="flex items-center gap-1">

                <LocationOnOutlinedIcon fontSize="small" className="text-black" />

                <span>{jobDetail?.location}</span>

              </div>
            </div>

            <div className="flex justify-items-start md:justify-end items-center gap-2 pr-5 font-semibold text-sm md:text-base">

              <TwoWheelerSharpIcon fontSize='large' className='text-yellow-500' />

              <span>Salary : {jobDetail?.salary ? jobDetail.salary : "Competative"}</span>

            </div>

          </div>
        </Box>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Box className="bg-[#fafafa] shadow-sm p-6 rounded-xl">
              <h2 className="text-lg font-semibold text-gray-800 my-1.5">📃Job Description</h2>
              <p className="text-gray-500 text-sm leading-relaxed wrap-break-word">
                {jobDetail?.description}
              </p>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 mt-10">Skills Required</h2>
                <div className="flex flex-wrap gap-4">
                  {jobDetail?.skills?.map((skill,index) => (
                      <Badge variant={"success"} key={index}>{skill}</Badge>
                  ))}
                </div>
            </Box>
          </div>
          <div className="space-y-6 ">
            <Box className="bg-[#fafafa] rounded-xl shadow-sm p-6 space-y-5">
              <h3 className="font-semibold text-gray-500">📃 JOB OVERVIEW</h3>
              <div className="flex items-center gap-3">
                <Avatar className="bg-black!"> <BusinessOutlinedIcon /> </Avatar>
                <div>
                  <p className="font-medium text-gray-800">
                    Company
                  </p>
                  <p className="text-sm text-gray-500">
                    {jobDetail?.company}
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Badge variant={"secondary"} className='text-gray-800'>Location</Badge>
                  <span>:</span>
                  <span>{jobDetail?.location}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant={"secondary"} className='text-gray-800'>JobType</Badge>
                  <span>:</span>
                  <span>{jobDetail?.jobType}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant={"secondary"} className='text-gray-800'>ExperienceLevel</Badge>
                  <span>:</span>
                  <span>{jobDetail?.experienceLevel}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={"secondary"} className='text-gray-800'>Salary</Badge>
                  <span>:</span>
                  <span>{jobDetail?.salary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={"secondary"} className='text-gray-800'>Status</Badge>
                  <span>:</span>
                  <Badge variant={"success"}> {jobDetail?.isActive ? 'Active' : 'Closed'}</Badge>
                </div>

              </div>
            </Box>

            <Box className="bg-white rounded-xl shadow-sm p-6 space-y-4">

              <h3 className="font-semibold text-gray-800">🔗 Apply</h3>
              <h3 className="font-semibold text-blue-500">{jobDetail?.applicationUrl}</h3>

              <div className="flex items-center gap-3">


                <div className="flex items-center gap-3">
                  {/* Ab yahan Client Component call ho raha hai */}
                </div>
                <JobApplyBtn url={jobDetail?.applicationUrl} />

              </div>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
  
}

export default Home
