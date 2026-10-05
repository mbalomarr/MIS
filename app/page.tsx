import { AcademicHub } from "@/components/sections/AcademicHub";
import { ClubCommunity } from "@/components/sections/ClubCommunity";
import { Hero } from "@/components/sections/Hero";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";

// Re-render hourly: keeps past/upcoming event labels and GitHub stats current without a redeploy.
export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      <Hero />
      <AcademicHub />
      <ClubCommunity />
      <ProjectsShowcase />
    </>
  );
}
