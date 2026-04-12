import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const userDataArr = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  const user = userDataArr[0];
  if (!user) redirect("/Profile/form");

  const initials = user.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const roleLabel =
    user.role === "EMPLOYER"
      ? "Employer"
      : user.role === "ADMIN"
      ? "Admin"
      : "Job Seeker";

  const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-zinc-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-4">

        {/* ── PAGE HEADER ── */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-zinc-900 tracking-tight">My Profile</h1>
            <p className="text-xs text-zinc-400 mt-0.5">Manage your personal information</p>
          </div>
          <a
            href="/Profile/form"
            className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Profile
          </a>
        </div>

        {/* ── PROFILE CARD ── */}
        <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">

          {/* Black top accent */}
          <div className="h-1 bg-zinc-900" />

          {/* Avatar + Info + Member Since */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 px-6 pt-6 pb-5">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-zinc-900 flex items-center justify-center shadow-lg">
                  {user.image ? (
                    <img src={user.image} alt="Avatar" className="w-full h-full object-cover rounded-2xl" />
                  ) : (
                    <span className="text-lg font-black text-white tracking-wide">{initials}</span>
                  )}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full" />
              </div>

              {/* Name, email, role */}
              <div>
                <p className="text-base font-black text-zinc-900 tracking-tight">{user.name}</p>
                <p className="text-sm text-zinc-400 mt-0.5">{user.email}</p>
                <span className="inline-block mt-2 text-[11px] font-bold text-zinc-600 bg-zinc-100 border border-zinc-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {roleLabel}
                </span>
              </div>
            </div>

            {/* Member Since */}
            <div className="pl-20 sm:pl-0 text-left sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-zinc-100">
              <p className="text-[11px] text-zinc-400 font-medium uppercase tracking-widest">Member since</p>
              <p className="text-sm font-black text-zinc-800 mt-0.5">{memberSince}</p>
            </div>
          </div>

          {/* ── MY SKILLS ── */}
          <div className="border-t border-zinc-100 px-6 py-5">
            <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-3">My Skills</p>
            {user.skills && user.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill: string) => (
                  <span
                    key={skill}
                    className="text-xs font-semibold text-zinc-700 bg-zinc-50 border border-zinc-200 px-3 py-1.5 rounded-lg hover:bg-zinc-100 hover:border-zinc-300 transition-all duration-150"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-zinc-400">
                No skills added.{" "}
                <a href="/Profile/form" className="text-zinc-700 font-bold hover:underline">
                  Add skills →
                </a>
              </p>
            )}
          </div>

        </div>

        {/* ── RESUME CARD ── */}
        <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
          <div className="h-1 bg-zinc-900" />
          <div className="px-6 py-5">
            <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-3">Resume / CV</p>
            {user.resume ? (
              <div className="flex items-center gap-4 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3.5">
                <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center shrink-0 shadow">
                  <svg className="text-white w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-800">{user.resume}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">Uploaded resume</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 rounded-xl py-8 text-center">
                <svg className="w-8 h-8 text-zinc-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-sm text-zinc-400 font-medium">No resume uploaded</p>
                <a href="/Profile/form" className="text-sm text-zinc-700 font-bold mt-1.5 hover:underline">
                  Upload now →
                </a>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}