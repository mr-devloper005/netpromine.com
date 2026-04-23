import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building2, Leaf, MapPin, ShieldCheck, Target } from "lucide-react";
import { mockTeamMembers } from "@/data/mock-data";
import { SITE_CONFIG } from "@/lib/site-config";

const highlights = [
  { label: "Active listings", value: "8.6k+" },
  { label: "Cities represented", value: "120+" },
  { label: "Monthly searches", value: "240k" },
];

const values = [
  {
    title: "Clarity over clutter",
    description:
      "We keep the product focused on businesses, categories, and locations so visitors can compare without distraction.",
  },
  {
    title: "Trust you can scan",
    description:
      "Structured profiles, verification cues, and consistent layouts help teams shortlist vendors and partners faster.",
  },
  {
    title: "Built for operators",
    description:
      "Owners can update hours, services, and contact paths in one place—so what customers see stays accurate.",
  },
];

const milestones = [
  { year: "2022", text: "Launched the first regional directory pilot with a handful of verticals." },
  { year: "2024", text: "Expanded search, filters, and saved lists for procurement and local discovery teams." },
  { year: "2026", text: "Refreshed the entire experience around a calmer green palette and card-based browsing." },
];

export default function AboutPage() {
  return (
    <PageShell
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} is a modern business directory: curated categories, verified listings, and a calmer interface so the right company is easier to find.`}
      actions={
        <>
          <Button variant="outline" asChild className="rounded-full border-[#c5d4c4] bg-white text-[#1a472a] hover:bg-[#eef5ed]">
            <Link href="/team">Meet the team</Link>
          </Button>
          <Button asChild className="rounded-full bg-[#1a472a] text-white hover:bg-[#143620]">
            <Link href="/contact">Contact us</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <Card className="border-[#c5d4c4] bg-white shadow-sm">
          <CardContent className="space-y-6 p-8">
            <Badge className="border-0 bg-[#1a472a]/10 text-[#1a472a]">Our story</Badge>
            <h2 className="text-2xl font-bold tracking-tight text-[#0f2415] sm:text-3xl">A directory-first platform for serious discovery</h2>
            <p className="text-sm leading-relaxed text-[#4a5c4d] sm:text-base">
              We started from a simple frustration: business research shouldn&apos;t feel like scrolling a generic feed. {SITE_CONFIG.name} organizes
              companies the way buyers actually think—by industry, geography, and proof of quality—then gives each listing room to tell a complete story.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-2xl border border-[#d5e3d4] bg-[#f4faf4] p-5">
                  <div className="text-2xl font-bold text-[#0f2415]">{item.value}</div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wide text-[#4a5c4d]">{item.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="grid gap-4">
          <Card className="border-[#c5d4c4] bg-white shadow-sm">
            <CardContent className="flex gap-4 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1a472a]/10 text-[#1a472a]">
                <Target className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#0f2415]">Mission</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4a5c4d]">Make high-quality business information easy to find, compare, and act on—without burying it in unrelated content.</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#c5d4c4] bg-white shadow-sm">
            <CardContent className="flex gap-4 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#e98b2a]/15 text-[#c45a00]">
                <Leaf className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#0f2415]">Principles</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4a5c4d]">We favor legible typography, generous whitespace, and honest metadata over growth hacks or dark patterns.</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-[#c5d4c4] bg-white shadow-sm">
            <CardContent className="flex gap-4 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1a472a]/10 text-[#1a472a]">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#0f2415]">Quality bar</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4a5c4d]">Listings are reviewed for completeness so categories stay useful for everyone browsing the directory.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {values.map((value) => (
          <Card key={value.title} className="border-[#c5d4c4] bg-white shadow-sm transition-transform hover:-translate-y-0.5">
            <CardContent className="p-7">
              <Building2 className="h-5 w-5 text-[#1a472a]" />
              <h3 className="mt-4 text-lg font-semibold text-[#0f2415]">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#4a5c4d]">{value.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-12 border-[#c5d4c4] bg-[#1a472a] text-white shadow-sm">
        <CardContent className="grid gap-8 p-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-100/90">Timeline</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight">How we got here</h2>
            <p className="mt-3 text-sm leading-relaxed text-emerald-100/95">From early pilots to today&apos;s nationwide coverage, we&apos;ve stayed focused on the same promise: better lists, not longer feeds.</p>
          </div>
          <ul className="space-y-4">
            {milestones.map((m) => (
              <li key={m.year} className="flex gap-4 rounded-2xl border border-white/15 bg-white/5 px-4 py-3">
                <span className="font-mono text-sm font-bold text-[#e98b2a]">{m.year}</span>
                <span className="text-sm leading-relaxed text-emerald-50">{m.text}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="mt-12">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4a5c4d]">Leadership snapshot</p>
            <h2 className="text-2xl font-bold text-[#0f2415]">People behind the directory</h2>
          </div>
          <Link href="/team" className="text-sm font-semibold text-[#1a472a] hover:underline">
            View full team →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {mockTeamMembers.map((member) => (
            <Card key={member.id} className="border-[#c5d4c4] bg-white shadow-sm transition-transform hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Avatar className="h-14 w-14 border-2 border-[#d5e3d4]">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-[#0f2415]">{member.name}</p>
                    <p className="text-xs text-[#4a5c4d]">{member.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[#4a5c4d]">{member.bio}</p>
                <p className="mt-3 flex items-center gap-1 text-xs text-[#4a5c4d]">
                  <MapPin className="h-3.5 w-3.5" />
                  {member.location}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
