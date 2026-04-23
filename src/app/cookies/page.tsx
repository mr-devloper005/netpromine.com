import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const cookies = [
  {
    title: 'Essential cookies',
    body: 'Keep you signed in, protect forms from abuse, and route traffic securely across our infrastructure.',
    control: 'Required — cannot be disabled without breaking core flows.',
  },
  {
    title: 'Functional cookies',
    body: 'Remember UI choices such as filters, collapsed panels, and saved shortlists on this device.',
    control: 'Optional — clear site data in your browser to reset.',
  },
  {
    title: 'Analytics cookies',
    body: 'Help us understand which categories and search patterns are healthy so we can prioritize roadmap work.',
    control: 'Optional — aggregated where possible; no sale of personal data.',
  },
]

export default function CookiesPage() {
  return (
    <PageShell
      title="Cookie policy"
      description="Transparent breakdown of cookies and similar technologies used on the directory experience."
    >
      <div className="mb-8 rounded-2xl border border-[#d5e3d4] bg-[#f4faf4] p-6 text-sm text-[#4a5c4d]">
        We minimize cross-site tracking. Where third-party embeds appear (for example maps), those providers may set their own cookies governed by their policies.
        Review{' '}
        <Link href="/privacy" className="font-semibold text-[#1a472a] hover:underline">
          privacy
        </Link>{' '}
        for broader data practices.
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {cookies.map((c) => (
          <Card key={c.title} className="border-[#c5d4c4] bg-white shadow-sm">
            <CardContent className="flex h-full flex-col p-6">
              <h2 className="text-lg font-bold text-[#0f2415]">{c.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[#4a5c4d]">{c.body}</p>
              <Badge variant="outline" className="mt-4 w-fit border-[#c5d4c4] text-xs text-[#1a472a]">
                {c.control}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  )
}
