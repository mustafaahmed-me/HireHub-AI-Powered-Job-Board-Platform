CREATE TYPE "public"."job_type" AS ENUM('FULL_TIME', 'PART_TIME', 'CONTRACT', 'REMOTE', 'INTERNSHIP');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('SEEKER', 'EMPLOYER', 'ADMIN');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('PENDING', 'REVIEWED', 'SHORTLISTED', 'REJECTED', 'ACCEPTED');--> statement-breakpoint
CREATE TABLE "Applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"status" "status" DEFAULT 'PENDING' NOT NULL,
	"cover_letter" text,
	"user_id" text NOT NULL,
	"job_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Post-Jobs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"company" text NOT NULL,
	"location" text NOT NULL,
	"type" "job_type" NOT NULL,
	"salary" text,
	"description" text NOT NULL,
	"skills" text[],
	"is_active" boolean DEFAULT true NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"image" text,
	"role" "role" DEFAULT 'SEEKER' NOT NULL,
	"resume" text,
	"skills" text[],
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "Applications" ADD CONSTRAINT "Applications_user_id_Users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Applications" ADD CONSTRAINT "Applications_job_id_Post-Jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."Post-Jobs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Post-Jobs" ADD CONSTRAINT "Post-Jobs_user_id_Users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE no action;