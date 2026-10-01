import { getProjects } from "@/lib/projects";
import { KnowledgeBrowser } from "./knowledge-browser";

export default async function KnowledgePage() {
  const projects = await getProjects();
  return <KnowledgeBrowser projects={projects} />;
}
