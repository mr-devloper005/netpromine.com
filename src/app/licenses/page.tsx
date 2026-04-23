import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const licenses = [
  { name: 'Next.js', publisher: 'Vercel, Inc.', license: 'MIT', description: 'App router, streaming, and deployment tooling.' },
  { name: 'React', publisher: 'Meta Platforms, Inc.', license: 'MIT', description: 'UI rendering and server components ecosystem.' },
  { name: 'Tailwind CSS', publisher: 'Tailwind Labs', license: 'MIT', description: 'Utility-first styling system.' },
  { name: 'Lucide', publisher: 'Lucide contributors', license: 'ISC', description: 'Icon set used across marketing pages.' },
  { name: 'Radix UI', publisher: 'WorkOS', license: 'MIT', description: 'Accessible primitives for dialogs, accordions, and forms.' },
]

export default function LicensesPage() {
  return (
    <PageShell
      title="Open source licenses"
      description="We ship on top of a strong open-source foundation. This page highlights major dependencies and their licenses."
    >
      <Card className="border-[#c5d4c4] bg-white shadow-sm">
        <CardContent className="divide-y divide-[#d5e3d4] p-0">
          {licenses.map((license) => (
            <div key={license.name} className="flex flex-col gap-2 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-[#0f2415]">{license.name}</p>
                <p className="text-xs text-[#4a5c4d]">{license.publisher}</p>
                <p className="mt-2 text-sm text-[#4a5c4d]">{license.description}</p>
              </div>
              <Badge className="w-fit border-0 bg-[#1a472a]/10 text-[#1a472a] sm:shrink-0">{license.license}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
      <p className="mt-6 text-center text-xs text-[#4a5c4d]">
        Full attribution files ship with application bundles. Contact your account team if you need a formal SBOM export.
      </p>
    </PageShell>
  )
}
