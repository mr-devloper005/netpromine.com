import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Journal | ${SITE_CONFIG.name}`,
  description: "Articles on listings, search quality, and running a modern business directory.",
};

const insights = [
  {
    slug: "quality-signals-buyers-trust",
    tag: "Playbook",
    date: "Apr 2, 2026",
    read: "6 min read",
    title: "Quality signals buyers actually trust in a directory",
    excerpt:
      "Beyond star ratings: how service area, response time, and structured attributes shorten the path from search to shortlist.",
  },
  {
    slug: "onboarding-checklist-new-listings",
    tag: "Operators",
    date: "Mar 18, 2026",
    read: "5 min read",
    title: "A practical onboarding checklist for new listings",
    excerpt:
      "The first fourteen days matter. Here is the minimum data we recommend before publishing—and how to iterate after launch.",
  },
  {
    slug: "search-intent-categories",
    tag: "Product",
    date: "Mar 4, 2026",
    read: "7 min read",
    title: "Designing categories around real search intent",
    excerpt:
      "Why flat taxonomies break down at scale, and how we group industries so procurement teams can scan without losing precision.",
  },
  {
    slug: "directory-seo-basics",
    tag: "Growth",
    date: "Feb 19, 2026",
    read: "4 min read",
    title: "Directory SEO basics for business owners",
    excerpt:
      "Titles, meta descriptions, and internal links that help your listing surface in both on-site search and external search engines.",
  },
];

export default function BlogPage() {
  return (
    <PageShell
      title="Journal"
      description={`Notes from the ${SITE_CONFIG.name} team on listings, search, and building a directory people return to.`}
      actions={
        <Button variant="outline" asChild className="rounded-full border-[#c5d4c4] bg-white text-[#1a472a] hover:bg-[#eef5ed]">
          <Link href="/press">Press room</Link>
        </Button>
      }
    >
      <div className="mb-10 rounded-[2rem] border border-[#d5e3d4] bg-[#f4faf4] p-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
        <div className="max-w-2xl">
          <Badge className="border-0 bg-[#1a472a]/10 text-[#1a472a]">Editorial</Badge>
          <h2 className="mt-4 text-2xl font-bold text-[#0f2415]">Ideas for teams who live in spreadsheets and search bars</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#4a5c4d] sm:text-base">
            We publish sparingly—only when we have field learnings worth sharing. Expect practical checklists, product philosophy, and
            behind-the-scenes looks at how the directory evolves.
          </p>
        </div>
        <Button asChild className="mt-6 shrink-0 rounded-full bg-[#e98b2a] text-white hover:bg-[#d97a1f] lg:mt-0">
          <Link href="/contact">Suggest a topic</Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {insights.map((post) => (
          <Card key={post.slug} className="border-[#c5d4c4] bg-white shadow-sm transition-transform hover:-translate-y-0.5">
            <CardContent className="flex h-full flex-col p-7">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="border-0 bg-[#1a472a]/10 text-[#1a472a]">{post.tag}</Badge>
                <span className="text-xs text-[#4a5c4d]">{post.date}</span>
                <span className="text-xs text-[#4a5c4d]">· {post.read}</span>
              </div>
              <h3 className="mt-4 text-xl font-bold leading-snug text-[#0f2415]">{post.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[#4a5c4d]">{post.excerpt}</p>
              <Button variant="link" className="mt-4 h-auto justify-start p-0 text-[#1a472a]" asChild>
                <Link href={`/blog/${post.slug}`}>Continue reading →</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
