import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/shared/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/site-config";

const journalPosts: Record<
  string,
  { title: string; tag: string; date: string; read: string; excerpt: string; sections: { heading: string; body: string }[] }
> = {
  "quality-signals-buyers-trust": {
    title: "Quality signals buyers actually trust in a directory",
    tag: "Playbook",
    date: "Apr 2, 2026",
    read: "6 min read",
    excerpt: "How structured metadata beats vanity metrics when procurement teams evaluate vendors.",
    sections: [
      {
        heading: "Start with the job to be done",
        body: "Buyers rarely arrive looking for a single number. They are trying to answer: can this vendor serve my region, do they understand my industry, and how fast can we get a human on the phone? Your listing should answer those questions in the first screen.",
      },
      {
        heading: "Signals that compound",
        body: "Consistent categories, verified domains, response-time expectations, and clear service boundaries all stack together. When one signal is weak, the rest can still carry trust—but silence across the board reads as risk.",
      },
      {
        heading: "What we are building next",
        body: "We are experimenting with richer comparison views for teams that shortlist three to five vendors at a time, without turning the directory into a spreadsheet clone.",
      },
    ],
  },
  "onboarding-checklist-new-listings": {
    title: "A practical onboarding checklist for new listings",
    tag: "Operators",
    date: "Mar 18, 2026",
    read: "5 min read",
    excerpt: "The first two weeks after launch set the tone for inbound quality.",
    sections: [
      {
        heading: "Before you publish",
        body: "Upload a square logo, write a one-sentence promise, and list the top three services you want to be found for. Pick a primary category that matches how buyers search—not how your org chart thinks.",
      },
      {
        heading: "Week one habits",
        body: "Respond to every inquiry within one business day, even if the answer is a polite redirect. Fast responses train the algorithms—and humans—that your profile is alive.",
      },
      {
        heading: "Iterate monthly",
        body: "Refresh photos seasonally, revisit FAQs, and prune outdated certifications. Stale listings quietly drift down in relevance.",
      },
    ],
  },
  "search-intent-categories": {
    title: "Designing categories around real search intent",
    tag: "Product",
    date: "Mar 4, 2026",
    read: "7 min read",
    excerpt: "Taxonomies work when they mirror language people already use in RFPs and search bars.",
    sections: [
      {
        heading: "Listen to the nouns",
        body: "We review anonymized search logs and support transcripts quarterly. When the same adjacent phrases appear—like “clinical staffing” vs “travel nursing”—we adjust category copy instead of forcing everyone into one bucket.",
      },
      {
        heading: "Depth without maze-clicking",
        body: "Deep trees hide great businesses. We bias toward broader parent categories with strong filters so discovery stays two clicks or fewer.",
      },
      {
        heading: "Feedback loops",
        body: "Listing owners can suggest category refinements. Moderators merge duplicates and document the rationale so the next city rollout inherits the lesson.",
      },
    ],
  },
  "directory-seo-basics": {
    title: "Directory SEO basics for business owners",
    tag: "Growth",
    date: "Feb 19, 2026",
    read: "4 min read",
    excerpt: "On-site and off-site habits that keep your profile discoverable.",
    sections: [
      {
        heading: "Titles that match intent",
        body: "Lead with the customer outcome, not internal project names. Pair your brand with a plain-language descriptor buyers actually type.",
      },
      {
        heading: "Structured snippets",
        body: "Fill every structured field—hours, service area, certifications. Search engines reward completeness because users do too.",
      },
      {
        heading: "Cross-link thoughtfully",
        body: "Link to official docs, case studies, or booking flows that reinforce trust. Avoid keyword stuffing; relevance wins.",
      },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(journalPosts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = journalPosts[slug];
  if (!post) return { title: `Journal | ${SITE_CONFIG.name}` };
  return {
    title: `${post.title} | ${SITE_CONFIG.name}`,
    description: post.excerpt,
  };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = journalPosts[slug];
  if (!post) notFound();

  return (
    <PageShell
      title={post.title}
      description={post.excerpt}
      actions={
        <Button variant="outline" asChild className="rounded-full border-[#c5d4c4] bg-white text-[#1a472a] hover:bg-[#eef5ed]">
          <Link href="/blog">← All articles</Link>
        </Button>
      }
    >
      <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-[#4a5c4d]">
        <Badge className="border-0 bg-[#1a472a]/10 text-[#1a472a]">{post.tag}</Badge>
        <span>{post.date}</span>
        <span>·</span>
        <span>{post.read}</span>
      </div>

      <article className="space-y-10">
        {post.sections.map((section) => (
          <section key={section.heading} className="rounded-[1.5rem] border border-[#d5e3d4] bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-[#0f2415]">{section.heading}</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#4a5c4d] sm:text-base">{section.body}</p>
          </section>
        ))}
      </article>

      <div className="mt-12 rounded-[2rem] border border-[#c5d4c4] bg-[#f4faf4] p-8 text-center">
        <p className="text-sm font-medium text-[#0f2415]">Questions about this topic?</p>
        <p className="mt-2 text-sm text-[#4a5c4d]">Our team reads every note—especially when it helps us prioritize the roadmap.</p>
        <Button asChild className="mt-5 rounded-full bg-[#1a472a] text-white hover:bg-[#143620]">
          <Link href="/contact">Contact us</Link>
        </Button>
      </div>
    </PageShell>
  );
}
