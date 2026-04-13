"use client"

import { jobFormSchema, JobFormValues } from "@/lib/validators";
import { useAuth } from "@clerk/nextjs";
import { redirect } from 'next/navigation';
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { postJobs } from "../../../actions/jobActions";
import { toast } from "sonner";
import React, { useState } from "react";


const PostJobForm = () => {
    const { isSignedIn } = useAuth()
    if(!isSignedIn) redirect("/sign-in")
    const [loading, setLoading] =useState(false)



    const form = useForm<JobFormValues>({
        resolver: zodResolver(jobFormSchema),
        defaultValues: {
            title: "",
            company : "",
            jobType : "INTERNSHIP",
            location : "",
            experienceLevel : "ENTRY-LEVEL",
            salary : "",
            skills : "",
            applicationUrl: "",
            description : ""
        },
    });


    const onSubmit = async (data : JobFormValues) => {
        setLoading(true)
        try {
          const response = await postJobs(data);
          if(response.success){
            toast.success("Your job has been posted successfully!")
            form.reset()
          }else{
            toast.error(response.error || "An error occured")
          }
        } catch (error) {
          toast.error("An unexpected error occured. Please try again.")
        }finally{
          setLoading(false)
        }
    }
        
  return (
    <Card className="my-8">
        <CardContent>
          <form id="post-job-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="job-title">
                    Job Title
                  </FieldLabel>
                  <Input
                    {...field}
                    id="job-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="eg. Senior Frontend Engineer"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="company"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="company">
                    Company Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="conpany"
                    aria-invalid={fieldState.invalid}
                    placeholder="eg. Google"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="skills"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="skills">
                    Skills Required
                  </FieldLabel>
                  <Input
                    {...field}
                    id="skills"
                    aria-invalid={fieldState.invalid}
                    placeholder="eg. NextJs, NodeJs"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* JobType and Experience level Container Starts*/}
            <div className="grid gap-6 md:grid-cols-2">
                <Controller
                    name="jobType"
                    control={form.control}
                    render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Job Type</FieldLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="FULL_TIME">Full time</SelectItem>
                            <SelectItem value="PART_TIME">Part time</SelectItem>
                            <SelectItem value="CONTRACT">Contract</SelectItem>
                            <SelectItem value="REMOTE">Remote</SelectItem>
                            <SelectItem value="INTERNSHIP">Internship</SelectItem>
                        </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                    </Field>
                )}
                />


                <Controller
                    name="experienceLevel"
                    control={form.control}
                    render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Experience Level</FieldLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ENTRY-LEVEL">ENTRY-LEVEL</SelectItem>
                            <SelectItem value="MID-LEVEL">MID-LEVEL</SelectItem>
                            <SelectItem value="SENIOR">SENIOR</SelectItem>
                            <SelectItem value="EXECUTIVE">EXECUTIVE</SelectItem>
                        </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                    </Field>
                )}
                />
            </div>

            {/* JobType and Experience level Container Ends*/}


            {/* Location and Salary Container Starts*/}
            <div className="grid gap-6 md:grid-cols-2">
                <Controller
                    name="location"
                    control={form.control}
                    render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="location">
                        location
                    </FieldLabel>
                    <Input
                        {...field}
                        id="location"
                        aria-invalid={fieldState.invalid}
                        placeholder="eg. Karachi, Pakistan"
                    />
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                    </Field>
                    )}
                />

                <Controller
                    name="salary"
                    control={form.control}
                    render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="salary">
                        Salary Range (Optional)
                    </FieldLabel>
                    <Input
                        {...field}
                        id="salary"
                        aria-invalid={fieldState.invalid}
                        placeholder="eg. $100k - $150k"
                    />
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                    </Field>
                    )}
                />
            </div>
            {/* Location and Salary Container Ends*/}

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="job-description">
                    Job Description
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="job-description"
                      placeholder="Describe the role, responsibility, qualifications, and benefits..."
                      rows={8}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/50 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldDescription>
                    Provide a comprehensive description of the position . 
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

            {/* For Url */}
            <div className="py-8">
                <Controller
                    name="applicationUrl"
                    control={form.control}
                    render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="application-url">
                        Application URL
                    </FieldLabel>
                    <Input
                        {...field}
                        id="application-url"
                        aria-invalid={fieldState.invalid}
                        placeholder="eg. https://example.com/apply"
                    />
                    <FieldDescription>
                        Where should candidates apply for this position?
                    </FieldDescription>
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                    </Field>
                    )}
                />
            </div>
        </form>
        </CardContent>
        <CardFooter>
            <Field orientation="horizontal">
          <Button type="button" variant="ghost" onClick={() => form.reset()} className={loading ? "cursor-not-allowed" : "cursor-pointer"}>
            Reset
          </Button>
          <Button type="submit" disabled={loading} form="post-job-form" className={loading ? "bg-gray-700 cursor-not-allowed" : "bg-black cursor-pointer"}>
            {loading ? "Publishing..." : "Publish Job"}
          </Button>
        </Field>
        </CardFooter>
    </Card>
  )

}



export default PostJobForm


