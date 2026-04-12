// "use server"

// import { db } from "@/lib/db"
// import { jobs, NewJob, users } from "@/lib/schema"
// import { desc, eq, and } from "drizzle-orm"
// import { sql } from "drizzle-orm/sql"
// import { auth,currentUser } from "@clerk/nextjs/server"
// import { revalidatePath } from "next/cache"
// import { jobFormSchema, JobFormValues } from "@/lib/validators"

// export type GetJobsOptions = {
//   search?: string
//   location?: string
//   jobType?: string
//   page?: number
//   pageSize?: number
// }

// export async function getJobs(options?: GetJobsOptions){
//     try{
//         const conditions = [] as Array<ReturnType<typeof eq> | ReturnType<typeof sql>>;

//         if (options?.jobType) {
//           conditions.push(eq(jobs.jobType, options.jobType as any))
//         }

//         if (options?.search) {
//           conditions.push(sql`${jobs.title} ILIKE ${`%${options.search}%`}`)
//         }

//         if (options?.location) {
//           conditions.push(sql`${jobs.location} ILIKE ${`%${options.location}%`}`)
//         }

//         const query = db
//           .select()
//           .from(jobs)
//           .where(conditions.length ? and(...conditions) : undefined)
//           .orderBy(desc(jobs.createdAt))

//         const finalQuery = options?.page != null && options?.pageSize != null
//           ? query.limit(options.pageSize).offset((options.page - 1) * options.pageSize)
//           : query

//         const jobsData = await finalQuery
//         return jobsData
//     }catch(err){
//         console.log(err)
//         return []
//     }
// }
// export async function getJobsForHomePage(){
//     try{
//         const jobsData = await db
//         .select()
//         .from(jobs)
//         .orderBy(desc(jobs.createdAt)).limit(6)

//         return jobsData
//     }catch(err){
//         console.log(err)
//         return []
//     }
// }


// export async function postJobs(jobsData : JobFormValues){
//     const {userId, sessionClaims} = await auth()
//     const clerkUser = await currentUser();
//     if(!userId || !clerkUser) {
//         return {success : false, error : "User not found or not logged in"}
//     }

//     const validation = jobFormSchema.safeParse(jobsData)
//     if(!validation.success) {
//         return {success : false, error : "Invalid job data provided"}
//     }

//     try {

//         const data = validation.data;
//         // 1. Pehle check karein ke User DB mein hai ya nahi
//         const userExists = await db.select().from(users).where(eq(users.id, userId));

//         if (userExists.length === 0) {
//             await db.insert(users).values({
//                 id: userId,
//                 email: clerkUser.emailAddresses[0].emailAddress, // Pehla email address
//                 name: clerkUser.fullName || `${clerkUser.firstName} ${clerkUser.lastName}`,
//                 image: clerkUser.imageUrl,
//             });
// }

//         await db.insert(jobs).values({
//             title: data.title,
//             company: data.company,
//             location: data.location,
//             jobType: data.jobType as any,
//             experienceLevel: data.experienceLevel as any,
//             salary: data.salary,
//             description: data.description,
//             applicationUrl: data.applicationUrl,
//             userId: userId,
//             skills: data.skills.split(",").map((s) => s.trim()),
//         });

//         revalidatePath("/jobs");
//         return { success: true };
//     } catch (error) {
//         console.log(error);
//         return { success : false, error : "Failed to create the job"}
//     }
// }


"use server"
import { db } from "@/lib/db"
import { jobs, NewJob, users } from "@/lib/schema"
import { desc, eq, and } from "drizzle-orm"
import { sql } from "drizzle-orm/sql"
import { auth,currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { jobFormSchema, JobFormValues } from "@/lib/validators"

export type GetJobsOptions = {
  search?: string
  location?: string
  jobType?: string
  page?: number
  pageSize?: number
}

export async function getJobs(options?: GetJobsOptions){
    try{
        const conditions = [] as Array<ReturnType<typeof eq> | ReturnType<typeof sql>>;

        if (options?.jobType) {
          conditions.push(eq(jobs.jobType, options.jobType as any))
        }

        if (options?.search) {
          conditions.push(sql`${jobs.title} ILIKE ${`%${options.search}%`}`)
        }

        if (options?.location) {
          conditions.push(sql`${jobs.location} ILIKE ${`%${options.location}%`}`)
        }

        const query = db
          .select()
          .from(jobs)
          .where(conditions.length ? and(...conditions) : undefined)
          .orderBy(desc(jobs.createdAt))

        const finalQuery = options?.page != null && options?.pageSize != null
          ? query.limit(options.pageSize).offset((options.page - 1) * options.pageSize)
          : query

        const jobsData = await finalQuery
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