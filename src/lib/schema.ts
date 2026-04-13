import { pgTable, text, timestamp, boolean, pgEnum, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// 1. Enums Define Karein (Jo Prisma mein "enum" thay)
export const roleEnum = pgEnum('role', ['SEEKER', 'EMPLOYER', 'ADMIN']);
export const jobTypeEnum = pgEnum('jobType', ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'REMOTE', 'INTERNSHIP']);
export const experienceLevelEnum = pgEnum('experienceLevel', ['ENTRY-LEVEL', 'MID-LEVEL', 'SENIOR', 'EXECUTIVE']);
export const statusEnum = pgEnum('status', ['PENDING', 'REVIEWED', 'SHORTLISTED', 'REJECTED', 'ACCEPTED']);

// 2. User Table
export const users = pgTable('Users', {
  id: text('id').primaryKey(), // Clerk ki ID ke liye text behtar hai
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  image: text('image'),
  role: roleEnum('role').default('SEEKER').notNull(),
  resume: text('resume'),
  skills: text('skills').array(), // PostgreSQL array
  applications: text('applications').array().default([]),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 3. Job Table
export const jobs = pgTable('Post-Jobs', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  company: text('company').notNull(),
  location: text('location').notNull(),
  jobType: jobTypeEnum('jobType').notNull(),
  experienceLevel: experienceLevelEnum('experienceLevel').notNull(),
  salary: text('salary'),
  description: text('description').notNull(),
  skills: text('skills').array(),
  isActive: boolean('is_active').default(true).notNull(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  applicationUrl: text('application_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 4. Application Table
export const applications = pgTable('Applications', {
  id: uuid('id').defaultRandom().primaryKey(),
  status: statusEnum('status').default('PENDING').notNull(),
  coverLetter: text('cover_letter'),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  jobId: uuid('job_id').notNull().references(() => jobs.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// --- Types for Frontend ---
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Job = typeof jobs.$inferSelect;
export type NewJob = typeof jobs.$inferInsert;