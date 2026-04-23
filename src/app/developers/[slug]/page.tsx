import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/shared/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockApiEndpoints } from "@/data/mock-data";
import { SITE_CONFIG } from "@/lib/site-config";

function slugFromPath(path: string) {
  const segment = path.replace(/^\/api\//, "").split("/")[0];
  return segment || "overview";
}

const conceptualDocs: Record<
  string,
  { title: string; summary: string; blocks: { heading: string; body: string }[] }
> = {
  authentication: {
    title: "Authentication",
    summary: "Partner integrations use scoped API keys and short-lived tokens—never share long-lived secrets in browsers.",
    blocks: [
      {
        heading: "Issuing keys",
        body: "Create a key pair from the developer dashboard. Each key lists allowed scopes such as listings:read or listings:write. Revocation is immediate.",
      },
      {
        heading: "Request signing",
        body: "Include the version header `X-Directory-Version: 2026-04` on every call. Unsigned legacy endpoints are disabled for new tenants.",
      },
      {
        heading: "Rate limits",
        body: "Burst limits apply per key and per IP. Respect `Retry-After` headers when syncing large catalogs.",
      },
    ],
  },
  webhooks: {
    title: "Webhooks & events",
    summary: "Receive structured events when listings change state, when verification completes, or when billing milestones occur.",
    blocks: [
      {
        heading: "Delivery guarantees",
        body: "We retry with exponential backoff for up to 24 hours. Implement idempotent handlers using the event `id` field.",
      },
      {
        heading: "Payload shape",
        body: "Each payload includes `event`, `occurred_at`, and `resource` objects with stable IDs you can reconcile against your CRM.",
      },
      {
        heading: "Testing",
        body: "Use the sandbox toggle to replay fixtures without touching production listings.",
      },
    ],
  },
  security: {
    title: "Security & compliance",
    summary: "Directory data is classified by sensitivity. Follow least-privilege defaults when provisioning integrations.",
    blocks: [
      {
        heading: "Encryption",
        body: "TLS 1.2+ everywhere. Sensitive profile fields are encrypted at rest with tenant-isolated keys.",
      },
      {
        heading: "Audit trails",
        body: "Write operations append to an immutable audit log you can export for SOC2-style reviews.",
      },
      {
        heading: "Reporting issues",
        body: "Send suspected vulnerabilities to our security alias with reproduction steps—we acknowledge within two business days.",
      },
    ],
  },
};

export async function generateStaticParams() {
  const slugs = new Set<string>();
  mockApiEndpoints.forEach((e) => slugs.add(slugFromPath(e.path)));
  Object.keys(conceptualDocs).forEach((s) => slugs.add(s));
  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const concept = conceptualDocs[slug];
  if (concept) {
    return { title: `${concept.title} | Developers`, description: concept.summary };
  }
  const ep = mockApiEndpoints.find((e) => slugFromPath(e.path) === slug);
  if (ep) {
    return { title: `${ep.method} ${ep.path} | Developers`, description: ep.description };
  }
  return { title: `Developers | ${SITE_CONFIG.name}` };
}

export default async function DeveloperDocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const concept = conceptualDocs[slug];
  if (concept) {
    return (
      <PageShell
        title={concept.title}
        description={concept.summary}
        actions={
          <Button variant="outline" asChild className="rounded-full border-[#c5d4c4] bg-white text-[#1a472a] hover:bg-[#eef5ed]">
            <Link href="/developers">← All docs</Link>
          </Button>
        }
      >
        <div className="space-y-6">
          {concept.blocks.map((b) => (
            <section key={b.heading} className="rounded-[1.5rem] border border-[#d5e3d4] bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-lg font-bold text-[#0f2415]">{b.heading}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#4a5c4d] sm:text-base">{b.body}</p>
            </section>
          ))}
        </div>
      </PageShell>
    );
  }

  const endpoints = mockApiEndpoints.filter((e) => slugFromPath(e.path) === slug);
  if (!endpoints.length) notFound();

  return (
    <PageShell
      title={`/${slug} API`}
      description="Reference for the HTTP verbs and scopes supported on this resource."
      actions={
        <Button variant="outline" asChild className="rounded-full border-[#c5d4c4] bg-white text-[#1a472a] hover:bg-[#eef5ed]">
          <Link href="/developers">← All endpoints</Link>
        </Button>
      }
    >
      <div className="space-y-4">
        {endpoints.map((ep) => (
          <section key={ep.id} className="rounded-[1.5rem] border border-[#c5d4c4] bg-[#f4faf4] p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="border-0 bg-[#1a472a] text-white">{ep.method}</Badge>
              <code className="rounded-md bg-white px-2 py-1 text-sm text-[#0f2415] ring-1 ring-[#d5e3d4]">{ep.path}</code>
            </div>
            <p className="mt-4 text-sm text-[#4a5c4d]">{ep.description}</p>
            <p className="mt-2 text-xs font-medium uppercase tracking-wide text-[#4a5c4d]">Required scope · {ep.scope}</p>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
