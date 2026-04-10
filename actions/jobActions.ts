"use server"

import { db } from "@/lib/db"
import { jobs, NewJob, users } from "@/lib/schema"
import { desc ,eq} from "drizzle-orm"
import { auth,currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { jobFormSchema, JobFormValues } from "@/lib/validators"

export async function getJobs(){
    try{
        const jobsData = await db
        .select()
        .from(jobs)
        .orderBy(desc(jobs.createdAt))

        return jobsData
    }catch(err){
        console.log(err)
        return []
    }
}
export async function getJobsForHomePage(){
    try{
        const jobsData = await db
        .select()
        .from(jobs)
        .orderBy(desc(jobs.createdAt)).limit(6)

        return jobsData
    }catch(err){
        console.log(err)
        return []
    }
}


export async function postJobs(jobsData : JobFormValues){
    const {userId, sessionClaims} = await auth()
    const clerkUser = await currentUser();
    if(!userId || !clerkUser) {
        return {success : false, error : "User not found or not logged in"}
    }

    const validation = jobFormSchema.safeParse(jobsData)
    if(!validation.success) {
        return {success : false, error : "Invalid job data provided"}
    }

    try {

        const data = validation.data;
        // 1. Pehle check karein ke User DB mein hai ya nahi
        const userExists = await db.select().from(users).where(eq(users.id, userId));

        if (userExists.length === 0) {
            await db.insert(users).values({
                id: userId,
                email: clerkUser.emailAddresses[0].emailAddress, // Pehla email address
                name: clerkUser.fullName || `${clerkUser.firstName} ${clerkUser.lastName}`,
                image: clerkUser.imageUrl,
            });
}

        await db.insert(jobs).values({
            title: data.title,
            company: data.company,
            location: data.location,
            jobType: data.jobType as any,
            experienceLevel: data.experienceLevel as any,
            salary: data.salary,
            description: data.description,
            applicationUrl: data.applicationUrl,
            userId: userId,
            skills: data.skills.split(",").map((s) => s.trim()),
        });

        revalidatePath("/jobs");
        return { success: true };
    } catch (error) {
        console.log(error);
        return { success : false, error : "Failed to create the job"}
    }
}
