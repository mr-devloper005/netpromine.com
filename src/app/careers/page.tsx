import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Heart, Laptop, Users } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";

const roles = [
  {
    title: "Directory product designer",
    location: "Remote (US)",
    type: "Full-time",
    level: "Mid",
    blurb: "Shape listing templates, search flows, and trust surfaces for buyers and business owners.",
  },
  {
    title: "Full-stack engineer — discovery",
    location: "Hybrid · New York",
    type: "Full-time",
    level: "Senior",
    blurb: "Own performance, indexing, and APIs that keep search fast as the catalog grows.",
  },
  {
    title: "Customer success — listings",
    location: "Remote",
    type: "Full-time",
    level: "Mid",
    blurb: "Guide new organizations through onboarding, data quality, and ongoing profile health.",
  },
];

const benefits = [
  "Remote-first team with optional quarterly meetups",
  "Medical, dental, and vision for employees and dependents",
  "Annual learning budget for conferences and courses",
  "Transparent leveling and compensation bands",
];

const culture = [
  { icon: Users, title: "Small teams", text: "Squads stay close to customers so feedback shows up in the product quickly." },
  { icon: Laptop, title: "Deep work", text: "We protect maker time—fewer standing meetings, clearer priorities." },
  { icon: Heart, title: "Inclusive hiring", text: "We design interviews around skills and lived experience, not pedigree theater." },
  { icon: Briefcase, title: "Business empathy", text: "Everyone spends time with real listings and support tickets each quarter." },
];

export default function CareersPage() {
  return (
    <PageShell
      title="Careers"
      description={`Join ${SITE_CONFIG.name} and help build the directory experience businesses rely on to be found—and buyers rely on to decide.`}
      actions={
        <Button asChild className="rounded-full bg-[#1a472a] text-white hover:bg-[#143620]">
          <Link href="/contact">View open roles</Link>
        </Button>
      }
    >
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {culture.map((item) => (
          <Card key={item.title} className="border-[#c5d4c4] bg-white shadow-sm">
            <CardContent className="p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1a472a]/10 text-[#1a472a]">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-semibold text-[#0f2415]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#4a5c4d]">{item.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div className="space-y-5">
          {roles.map((role) => (
            <Card key={role.title} className="border-[#c5d4c4] bg-white shadow-sm">
              <CardContent className="p-7">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="border-0 bg-[#1a472a]/10 text-[#1a472a]">{role.level}</Badge>
                  <Badge variant="outline" className="border-[#c5d4c4] text-[#4a5c4d]">
                    {role.type}
                  </Badge>
                </div>
                <h2 className="mt-4 text-xl font-bold text-[#0f2415]">{role.title}</h2>
                <p className="mt-1 text-sm text-[#4a5c4d]">{role.location}</p>
                <p className="mt-3 text-sm leading-relaxed text-[#4a5c4d]">{role.blurb}</p>
                <Button variant="outline" className="mt-5 rounded-full border-[#c5d4c4] text-[#1a472a] hover:bg-[#eef5ed]" asChild>
                  <Link href="/contact">Apply for this role</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="border-[#c5d4c4] bg-[#f4faf4] shadow-sm">
          <CardContent className="p-8">
            <h3 className="text-lg font-bold text-[#0f2415]">Why {SITE_CONFIG.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#4a5c4d]">
              We&apos;re growing a calm, high-trust directory used by operators, procurement teams, and local customers. If you care about search quality,
              honest UX, and measurable outcomes for businesses, you&apos;ll fit right in.
            </p>
            <div className="mt-6 space-y-3">
              {benefits.map((benefit) => (
                <div key={benefit} className="rounded-xl border border-[#d5e3d4] bg-white px-4 py-3 text-sm text-[#4a5c4d]">
                  {benefit}
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-6 w-full rounded-full border-[#1a472a] text-[#1a472a] hover:bg-white" asChild>
              <Link href="/press">Read recent press</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
