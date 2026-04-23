import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { SITE_CONFIG } from '@/lib/site-config'

const sections = [
  {
    title: 'Information we collect',
    body: 'We collect account details (name, email), listing content you submit, usage events such as searches and clicks, and technical logs needed to keep the service secure and fast.',
  },
  {
    title: 'How we use information',
    body: 'Data powers search ranking, fraud prevention, customer support, billing, and product analytics in aggregated form. We do not sell personal data to brokers.',
  },
  {
    title: 'Sharing & subprocessors',
    body: 'Infrastructure and email providers may process data under contract. They may only use it to deliver services to us, not for independent marketing.',
  },
  {
    title: 'Retention',
    body: 'Listings remain until you delete them or close your account. Logs roll off on a fixed schedule except where we must preserve evidence for abuse investigations.',
  },
  {
    title: 'Your choices',
    body: 'You may export listing data, correct inaccuracies, opt out of non-essential emails, or delete your account subject to legal holds.',
  },
  {
    title: 'International visitors',
    body: 'If you access the directory from outside your home region, your data may be processed in countries where we operate data centers.',
  },
]

export default function PrivacyPage() {
  return (
    <PageShell
      title="Privacy policy"
      description={`How ${SITE_CONFIG.name} collects, uses, and protects information when you browse listings or manage a business profile.`}
    >
      <Card className="border-[#c5d4c4] bg-white shadow-sm">
        <CardContent className="space-y-8 p-8">
          <div className="flex flex-col gap-4 border-b border-[#d5e3d4] pb-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#4a5c4d]">Effective date</p>
            <p className="text-sm font-medium text-[#0f2415]">April 23, 2026</p>
          </div>
          <p className="text-sm leading-relaxed text-[#4a5c4d]">
            This summary is written for operators and buyers using the directory. For contractual language referenced in enterprise orders, contact{' '}
            <Link href="/contact" className="font-semibold text-[#1a472a] hover:underline">
              support
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
