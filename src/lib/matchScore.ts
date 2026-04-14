
export function calculateMatchScore(
  userSkills: string[],
  jobSkills: string[]
): number {
  if (jobSkills.length === 0) return 0;
  const normalizedUser = userSkills.map(s => s.toLowerCase().trim());
  const normalizedJob = jobSkills.map(s => s.toLowerCase().trim());
  const matches = normalizedJob.filter(skill =>
    normalizedUser.some(us => us.includes(skill) || skill.includes(us))
  );
  return Math.round((matches.length / normalizedJob.length) * 100);
}