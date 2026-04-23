import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Sparkles } from "lucide-react";
import { mockTeamMembers } from "@/data/mock-data";
import { SITE_CONFIG } from "@/lib/site-config";

const focusAreas = [
  {
    title: "Product & design",
    body: "Research with buyers and owners, prototype listing layouts, and ship improvements on a steady cadence.",
  },
  {
    title: "Engineering",
    body: "Search relevance, ingestion pipelines, and resilient APIs that keep the directory fast at scale.",
  },
  {
    title: "Go-to-market",
    body: "Partnerships, onboarding, and success programs that help organizations launch with strong data.",
  },
];

export default function TeamPage() {
  return (
    <PageShell
      title="Team"
      description={`The people building ${SITE_CONFIG.name}—a focused directory team spanning product, engineering, and customer success.`}
      actions={
        <Button asChild className="rounded-full bg-[#1a472a] text-white hover:bg-[#143620]">
          <Link href="/careers">View careers</Link>
        </Button>
      }
    >
      <div className="mb-10 grid gap-6 lg:grid-cols-3">
        {focusAreas.map((area) => (
          <Card key={area.title} className="border-[#c5d4c4] bg-white shadow-sm">
            <CardContent className="p-6">
              <Sparkles className="h-5 w-5 text-[#e98b2a]" />
              <h2 className="mt-3 text-lg font-bold text-[#0f2415]">{area.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#4a5c4d]">{area.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4a5c4d]">Leadership</p>
          <h2 className="text-2xl font-bold text-[#0f2415]">Meet the people guiding the directory</h2>
        </div>
        <Button variant="outline" asChild className="rounded-full border-[#c5d4c4] text-[#1a472a] hover:bg-[#eef5ed]">
          <Link href="/about">Read our story</Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {mockTeamMembers.map((member) => (
          <Card key={member.id} className="border-[#c5d4c4] bg-white shadow-sm transition-transform hover:-translate-y-1">
            <CardContent className="p-8 text-center">
              <Avatar className="mx-auto h-28 w-28 border-4 border-[#d5e3d4] shadow-md">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="mt-5 text-lg font-semibold text-[#0f2415]">{member.name}</h3>
              <p className="text-sm font-medium text-[#1a472a]">{member.role}</p>
              <p className="mt-4 text-sm leading-relaxed text-[#4a5c4d]">{member.bio}</p>
              <p className="mt-4 flex items-center justify-center gap-1 text-xs text-[#4a5c4d]">
                <MapPin className="h-3.5 w-3.5" />
                {member.location}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-12 border-[#c5d4c4] bg-[#f4faf4] shadow-sm">
        <CardContent className="flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-xl font-bold text-[#0f2415]">Want to collaborate?</h3>
            <p className="mt-2 max-w-xl text-sm text-[#4a5c4d]">We partner with industry associations, local chambers, and software vendors to keep listings accurate and useful.</p>
          </div>
          <Button asChild className="rounded-full bg-[#1a472a] text-white hover:bg-[#143620]">
            <Link href="/contact">Start a conversation</Link>
          </Button>
        </CardContent>
      </Card>
    </PageShell>
  );
}
