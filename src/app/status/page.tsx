import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Activity, Radio } from 'lucide-react'

const services = [
  { name: 'Directory web app', detail: 'Listing browse, search, and dashboards', status: 'Operational' },
  { name: 'Search & indexing', detail: 'Query API and category filters', status: 'Operational' },
  { name: 'Media & CDN', detail: 'Logos and listing imagery', status: 'Operational' },
  { name: 'Auth & accounts', detail: 'Sign-in, sessions, password flows', status: 'Operational' },
]

const incidents = [
  { date: 'Apr 8, 2026', title: 'Elevated latency on image transforms', status: 'Resolved', note: 'Mitigated by scaling edge workers; no data loss.' },
  { date: 'Mar 12, 2026', title: 'Delayed notification digests', status: 'Resolved', note: 'Queue backlog cleared within 45 minutes.' },
  { date: 'Feb 22, 2026', title: 'Search indexing lag', status: 'Resolved', note: 'Rebuilt incremental indexer snapshot.' },
]

export default function StatusPage() {
  return (
    <PageShell
      title="System status"
      description="Live snapshot of core services that power the business directory. We post incidents here first—before social channels."
      actions={
        <Button asChild variant="outline" className="rounded-full border-[#c5d4c4] bg-white text-[#1a472a] hover:bg-[#eef5ed]">
          <Link href="/contact">Report an issue</Link>
        </Button>
      }
    >
      <div className="mb-8 flex flex-wrap items-center gap-3 rounded-2xl border border-[#d5e3d4] bg-[#f4faf4] px-4 py-3 text-sm text-[#4a5c4d]">
        <span className="inline-flex items-center gap-2 font-semibold text-[#0f2415]">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1a472a] opacity-40" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#1a472a]" />
          </span>
          All systems operational
        </span>
        <span className="hidden sm:inline">·</span>
        <span>Updated every few minutes from production probes.</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {services.map((service) => (
          <Card key={service.name} className="border-[#c5d4c4] bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between gap-2">
                <Activity className="h-5 w-5 text-[#1a472a]" />
                <Badge className="border-0 bg-emerald-100 text-emerald-900">{service.status}</Badge>
              </div>
              <h2 className="mt-4 text-lg font-bold text-[#0f2415]">{service.name}</h2>
              <p className="mt-2 text-xs text-[#4a5c4d]">{service.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-10 border-[#c5d4c4] bg-white shadow-sm">
        <CardContent className="p-8">
          <div className="flex items-center gap-2">
            <Radio className="h-5 w-5 text-[#e98b2a]" />
            <h3 className="text-xl font-bold text-[#0f2415]">Incident history</h3>
          </div>
          <p className="mt-2 text-sm text-[#4a5c4d]">Recent events affecting availability or correctness of directory data.</p>
          <div className="mt-6 space-y-4">
            {incidents.map((incident) => (
              <div key={incident.title} className="rounded-2xl border border-[#d5e3d4] bg-[#f4faf4] px-5 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#4a5c4d]">{incident.date}</div>
                <div className="mt-1 text-sm font-semibold text-[#0f2415]">{incident.title}</div>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="border-[#c5d4c4] text-[#1a472a]">
                    {incident.status}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-[#4a5c4d]">{incident.note}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageShell>
  )
}
