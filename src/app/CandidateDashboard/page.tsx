"use client";

import { Box, Avatar, AvatarGroup, Button } from "@mui/material";
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import FingerprintOutlinedIcon from '@mui/icons-material/FingerprintOutlined';
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";


type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
};

const jobs: Job[] = [
  {
    id: 1,
    title: "Senior Jobs",
    company: "Product designer",
    location: "Remote",
  },
  {
    id: 2,
    title: "Saved Jobs",
    company: "Full stack developers",
    location: "New York",
  },
  {
    id: 3,
    title: "Saved Blogs",
    company: "Business Enthusiast",
    location: "Remote",
  },
];


function CandidateDashboard() {
  
    return (
        <>
            <div className="w-full bg-[url('/bg-banner.avif')] bg-cover bg-center bg-no-repeat pt-8 px-4 md:px-8">

                <div className="max-w-300 mx-auto">

                    <h1 className="text-2xl md:text-4xl font-semibold text-gray-800">Welcome, Sarah!</h1>

                    <p className="text-gray-600 mt-2 text-sm md:text-base">Find your dream business and start growing. at 2022 progress</p>


                    <div className="flex justify-between flex-wrap gap-3 mt-6">

                        <div className="flex flex-wrap">

                            <Box className="bg-blue-600 text-white rounded-r rounded-xl p-5 w-74 flex items-center justify-between">
                            
                                <div className="flex items-center gap-3">
                                    
                                    <AttachMoneyOutlinedIcon />
                                    
                                    <div>
                                        <p className="text-sm opacity-80">Applications</p>
                                        <p className="text-lg font-semibold">3</p>
                                    </div>

                                </div>
                            
                            </Box>

                            <Box className="bg-blue-500 text-white rounded-l rounded-xl p-5 w-74 flex items-center justify-between">
              
                                <div className="flex items-center gap-3">
                                    
                                    <WorkOutlineIcon />
                                    
                                    <div>
                                        <p className="text-sm opacity-80">Applications</p>
                                        <p className="text-lg font-semibold">3</p>
                                    </div>
                                
                                </div>
            
                            </Box>

                        </div>

                        <div className="flex flex-wrap">

                            <Box className="bg-blue-500 text-white rounded-r rounded-xl p-5 w-74 flex items-center justify-between">
                                
                                <div className="flex items-center gap-3">
                                    
                                    <ChatBubbleOutlineIcon />
                                
                                    <div>
                                        <p className="text-sm opacity-80">Messages</p>
                                        <p className="text-lg font-semibold">5</p>
                                    </div>
                              
                                </div>
                            
                            </Box>

                            <Box className="bg-blue-600 text-white rounded-l rounded-xl p-5 w-74 flex items-center justify-between">
                              
                                <div className="flex items-center gap-3">
                                    
                                    <GroupOutlinedIcon />
                                    
                                    <div>
                                        <p className="text-sm opacity-80">Meetings</p>
                                        <p className="text-lg font-semibold">5</p>
                                    </div>
                              
                                </div>
                            
                            </Box>

                        </div>

                    </div>

                </div>
            
            </div>

            <div className="w-full px-4 md:px-8 mt-8">

                <div className="max-w-300 mx-auto bg-white rounded-xl shadow-sm p-6">

                    <div className="flex justify-between flex-wrap items-center mb-6 gap-5">

                        <h2 className="text-lg md:text-xl font-bold text-gray-800">
                          <FingerprintOutlinedIcon className="pb-0.5" /> Candidate Dashboard
                        </h2>

                        <p className="text-md font-bold cursor-pointer hidden sm:block">
                          Recent Manager <ArrowDropDownIcon className="pl-0.5" />
                        </p>

                    </div>

                    <div className="space-y-10 sm:space-y-5">

                        {jobs.map((job) => (

                            <div key={job.id} className="flex flex-col md:flex-row md:items-center justify-between flex-wrap gap-4 border-b border-gray-300 pb-4">

                                <div className="flex gap-4">

                                    <Avatar alt={job.title} src={`https://i.pravatar.cc/150?img=${job.id}`} className="items-start" />

                                    <div>

                                        <h3 className="font-semibold text-gray-800">{job.title}</h3>

                                        <div className="flex justify-items-start flex-wrap gap-5 sm:gap-10 md:gap-15 lg:gap-20 text-sm text-gray-500">

                                            <p>{job.company} • {job.location}</p>

                                            <p>Satrt this journey since 2000 <ArrowRightAltOutlinedIcon fontSize="small" /></p>

                                        </div>
                 
                                    </div>

                                </div>

                                <div className="flex items-center gap-2.5 sm:gap-4 pl-13 sm:pl-0">

                                    <AvatarGroup max={3}>
                                      <Avatar src="https://i.pravatar.cc/150?img=10" />
                                      <Avatar src="https://i.pravatar.cc/150?img=11" />
                                      <Avatar src="https://i.pravatar.cc/150?img=12" />
                                    </AvatarGroup>

                                    <Button variant="outlined" size="small" className="rounded-full!">Continue</Button>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>
        </>
    );

}

export default CandidateDashboard
