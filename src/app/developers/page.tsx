import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code2, Webhook, Shield, BookOpen } from "lucide-react";
import { mockApiEndpoints } from "@/data/mock-data";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Developers | ${SITE_CONFIG.name}`,
  description: "API guides, authentication, and integration notes for the business directory.",
};

const guides = [
  {
    icon: BookOpen,
    title: "Authentication overview",
    body: "API keys are scoped to read or write operations. Rotate keys from the dashboard and avoid embedding secrets in client-side code.",
    href: "/developers/authentication",
  },
  {
    icon: Webhook,
    title: "Webhooks & events",
    body: "Subscribe to listing updates, verification changes, and billing events with at-least-once delivery semantics.",
    href: "/developers/webhooks",
  },
  {
    icon: Shield,
    title: "Data handling",
    body: "PII stays encrypted in transit and at rest. Use field-level access tokens when building partner integrations.",
    href: "/developers/security",
  },
];

function slugFromPath(path: string) {
  const segment = path.replace(/^\/api\//, "").split("/")[0];
  return segment || "overview";
}

export default function DevelopersPage() {
  const endpoints = mockApiEndpoints.map((e) => ({
    ...e,
    slug: slugFromPath(e.path),
  }));

  return (
    <PageShell
      title="Developers"
      description="Documentation and references for integrating with the directory—search, listings, and partner workflows."
      actions={
        <Button asChild className="rounded-full bg-[#1a472a] text-white hover:bg-[#143620]">
          <Link href="/status">System status</Link>
        </Button>
      }
    >
      <div className="mb-10 grid gap-4 md:grid-cols-3">
        {guides.map((item) => (
          <Card key={item.title} className="border-[#c5d4c4] bg-white shadow-sm">
            <CardContent className="flex h-full flex-col p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1a472a]/10 text-[#1a472a]">
                <item.icon className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-lg font-bold text-[#0f2415]">{item.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[#4a5c4d]">{item.body}</p>
              <Button variant="link" className="mt-4 h-auto justify-start p-0 text-[#1a472a]" asChild>
                <Link href={item.href}>Open guide →</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4a5c4d]">HTTP API</p>
          <h2 className="text-2xl font-bold text-[#0f2415]">Sample endpoints</h2>
          <p className="mt-2 max-w-2xl text-sm text-[#4a5c4d]">These illustrate request shapes. Production URLs and versioning headers ship in your partner packet.</p>
        </div>
      </div>

      <div className="grid gap-4">
        {endpoints.map((ep) => (
          <Card key={ep.id} className="border-[#c5d4c4] bg-[#f4faf4] shadow-sm">
            <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <Code2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1a472a]" />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="border-0 bg-[#1a472a] text-white">{ep.method}</Badge>
                    <code className="rounded-md bg-white px-2 py-0.5 text-sm text-[#0f2415] ring-1 ring-[#d5e3d4]">{ep.path}</code>
                  </div>
                  <p className="mt-2 text-sm text-[#4a5c4d]">{ep.description}</p>
                  <p className="mt-1 text-xs text-[#4a5c4d]">Scope: {ep.scope}</p>
                </div>
              </div>
              <Button variant="outline" asChild className="shrink-0 rounded-full border-[#c5d4c4] text-[#1a472a] hover:bg-white">
                <Link href={`/developers/${ep.slug}`}>View details</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
