import * as z from "zod";

export const jobFormSchema = z.object({
    title: z.string().min(3, "Title must be 3 characters"),
    company : z.string().min(2, "Company name must be at least 2 character"),
    jobType : z.enum(["FULL_TIME", "PART_TIME", "CONTRACT","REMOTE", "INTERNSHIP"]),
    location : z.string().min(2, "location is required"),
    experienceLevel : z.enum(["ENTRY-LEVEL", "MID-LEVEL", "SENIOR","EXECUTIVE"]),
    salary : z.string().optional(),
    skills: z.string().min(1, "Atleast one Skill is required"),    
    applicationUrl: z.string().url("Must be a valid Url"),
    description : z.string().min(30,"Description must be at least 30 characters")
})



export type JobFormValues = z.infer<typeof jobFormSchema>;