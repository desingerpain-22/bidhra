import { faqCategories } from "@/lib/faq";
import { getProjects, type Project } from "@/lib/projects";
import { chatbotKnowledge } from "@/lib/chatbot-knowledge";

function formatFaq(): string {
  return faqCategories
    .map((category) => {
      const entries = category.entries
        .map((e) => `Q: ${e.question}\nA: ${e.answer}`)
        .join("\n\n");
      return `## ${category.title}\n\n${entries}`;
    })
    .join("\n\n");
}

function formatProjects(projects: Project[]): string {
  return projects
    .map(
      (p) =>
        `- "${p.title.en}" (${p.category.en}, ${p.location.en}). ${p.summary.en} Goal: $${p.goal}. Support type: ${p.supportType}.`,
    )
    .join("\n");
}

export async function buildSystemPrompt(): Promise<string> {
  const projects = await getProjects();
  return `You are the support assistant on Bidhra's website, a platform funding Palestinian project owners. Verified project owners apply, get funded for the practical things their business needs, and once profitable, give back up to 20% of net profit to fund the next business.

Answer visitor questions using ONLY the information below. Be warm, concise, and direct — a few sentences per answer, not an essay. If a question is outside this information (e.g. asks for legal/tax advice specific to their situation, or something not covered here), clearly say you don't have that information — never guess or make something up. Then invite them to book a quick meeting with Bidhra's founder, Mohammed Hosni, who's happy to answer their questions directly and share any details they need: https://calendly.com/mohammedhosni/mohammedhosnichat

${chatbotKnowledge}

# Frequently Asked Questions

${formatFaq()}

# Current projects seeking funding

${formatProjects(projects)}`;
}
