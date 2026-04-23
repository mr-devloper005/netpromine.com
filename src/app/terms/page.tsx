import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { SITE_CONFIG } from '@/lib/site-config'

const sections = [
  {
    title: 'Acceptable use',
    body: 'Do not misuse the directory to harass businesses, post malware links, spam categories, or scrape the site in ways that degrade performance for others.',
  },
  {
    title: 'Accounts & access',
    body: 'You are responsible for credentials tied to your workspace. Notify us promptly if you suspect unauthorized access.',
  },
  {
    title: 'Listing content',
    body: 'You represent that information you publish is accurate to the best of your knowledge and that you have rights to any media you upload.',
  },
  {
    title: 'Intellectual property',
    body: 'We respect trademarks and copyrights. Report suspected infringement with evidence and we will review under applicable law.',
  },
  {
    title: 'Disclaimers',
    body: 'The directory is provided as-is. Third-party listings are not endorsements. Always perform your own diligence before contracts or payments.',
  },
  {
    title: 'Limitation of liability',
    body: 'To the extent permitted by law, we are not liable for indirect or consequential damages arising from use of the platform.',
  },
]

export default function TermsPage() {
  return (
    <PageShell
      title="Terms of service"
      description={`Rules for using ${SITE_CONFIG.name}, including acceptable use, listings responsibilities, and limitations of liability.`}
    >
      <Card className="border-[#c5d4c4] bg-white shadow-sm">
        <CardContent className="space-y-8 p-8">
          <div className="flex flex-col gap-4 border-b border-[#d5e3d4] pb-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#4a5c4d]">Last updated</p>
            <p className="text-sm font-medium text-[#0f2415]">April 23, 2026</p>
          </div>
          <p className="text-sm leading-relaxed text-[#4a5c4d]">
            These terms apply to visitors and account holders. Specific enterprise agreements may add or supersede sections where signed in writing. Questions?{' '}
            <Link href="/contact" className="font-semibold text-[#1a472a] hover:underline">
              Contact us
            </Link>
            .
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {sections.map((section) => (
              <div key={section.title} className="rounded-2xl border border-[#d5e3d4] bg-[#f4faf4] p-5">
                <h3 className="text-sm font-bold text-[#0f2415]">{section.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4a5c4d]">{section.body}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageShell>
  )
}
