import Link from 'next/link'
import { Building2, MapPin, Phone, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

function getTone(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      shell: 'bg-[#fbfdfb] text-[#142018]',
      panel: 'border border-[#c5d4c4] bg-white shadow-[0_24px_60px_rgba(20,32,24,0.08)]',
      soft: 'border border-[#d5e3d4] bg-[#f4faf4]',
      muted: 'text-[#4a5c4d]',
      action: 'bg-[#1a472a] text-white hover:bg-[#143620]',
      hero: 'border-b border-[#c5d4c4] bg-[linear-gradient(180deg,#e8f2ea_0%,#f4f7f3_100%)]',
    }
  }
  if (kind === 'editorial') {
    return {
      shell: 'bg-[#fbf6ee] text-[#241711]',
      panel: 'border border-[#dcc8b7] bg-[#fffdfa]',
      soft: 'border border-[#e6d6c8] bg-[#fff4e8]',
      muted: 'text-[#6e5547]',
      action: 'bg-[#241711] text-[#fff1e2] hover:bg-[#3a241b]',
      hero: 'border-b border-[#dbc6b6] bg-[linear-gradient(180deg,#fff9f0_0%,#fff1df_100%)]',
    }
  }
  if (kind === 'visual') {
    return {
      shell: 'bg-[#07101f] text-white',
      panel: 'border border-white/10 bg-white/6',
      soft: 'border border-white/10 bg-white/5',
      muted: 'text-slate-300',
      action: 'bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
      hero: 'border-b border-white/10 bg-white/5',
    }
  }
  return {
    shell: 'bg-[#f7f1ea] text-[#261811]',
    panel: 'border border-[#ddcdbd] bg-[#fffaf4]',
    soft: 'border border-[#e8dbce] bg-[#f3e8db]',
    muted: 'text-[#71574a]',
    action: 'bg-[#5b2b3b] text-[#fff0f5] hover:bg-[#74364b]',
    hero: 'border-b border-[#ddcdbd] bg-[#fffaf4]',
  }
}

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const tone = getTone(productKind)
  const lanes =
    productKind === 'directory'
      ? [
          { icon: Building2, title: 'Listings & verification', body: 'Claim a profile, update services, or ask about badges and category placement.' },
          { icon: Phone, title: 'Sales & partnerships', body: 'Bulk onboarding, co-marketing, and integrations for agencies or associations.' },
          { icon: MapPin, title: 'Coverage & data quality', body: 'Request a new region, report duplicate listings, or suggest taxonomy tweaks.' },
        ]
      : productKind === 'editorial'
        ? [
            { icon: Building2, title: 'Editorial submissions', body: 'Pitch essays, columns, and long-form ideas that fit the publication.' },
            { icon: Sparkles, title: 'Newsletter partnerships', body: 'Coordinate sponsorships, collaborations, and issue-level campaigns.' },
            { icon: Phone, title: 'Contributor support', body: 'Get help with voice, formatting, and publication workflow questions.' },
          ]
        : productKind === 'visual'
          ? [
              { icon: Sparkles, title: 'Creator collaborations', body: 'Discuss gallery launches, creator features, and visual campaigns.' },
              { icon: MapPin, title: 'Licensing and use', body: 'Reach out about usage rights, commercial requests, and visual partnerships.' },
              { icon: Phone, title: 'Media kits', body: 'Request creator decks, editorial support, or visual feature placement.' },
            ]
          : [
              { icon: Building2, title: 'General support', body: 'Account issues, billing, and product questions.' },
              { icon: Sparkles, title: 'Partnerships', body: 'Integrations, data projects, and co-marketing.' },
              { icon: Phone, title: 'Phone queue', body: 'For time-sensitive production incidents.' },
            ]

  return (
    <div className={`min-h-screen ${tone.shell}`}>
      <NavbarShell />
      <div className={tone.hero}>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4a5c4d]">Plans & contact</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-[#0f2415] sm:text-5xl">Let&apos;s route your request to the right team</h1>
          <p className={`mt-5 max-w-2xl text-base leading-relaxed ${tone.muted}`}>
            Share a bit of context below—whether you are listing a business, planning a partnership, or reporting inaccurate data. We read every message
            during business hours.
          </p>
        </div>
      </div>
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <h2 className="text-lg font-semibold text-[#0f2415]">How we help</h2>
            <div className="mt-6 space-y-4">
              {lanes.map((lane) => (
                <div key={lane.title} className={`rounded-[1.75rem] p-6 ${tone.soft}`}>
                  <lane.icon className="h-5 w-5 text-[#1a472a]" />
                  <h3 className="mt-3 text-xl font-semibold text-[#0f2415]">{lane.title}</h3>
                  <p className={`mt-2 text-sm leading-relaxed ${tone.muted}`}>{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-[2rem] p-8 ${tone.panel}`}>
            <h2 className="text-2xl font-bold text-[#0f2415]">Send a message</h2>
            <p className={`mt-2 text-sm ${tone.muted}`}>This form is for planning conversations—no account changes are made until we confirm details.</p>
            <form className="mt-6 grid gap-4" action="#">
              <Input className="h-12 rounded-xl border-[#c5d4c4] bg-white" placeholder="Your name" name="name" />
              <Input className="h-12 rounded-xl border-[#c5d4c4] bg-white" placeholder="Work email" name="email" type="email" />
              <Input className="h-12 rounded-xl border-[#c5d4c4] bg-white" placeholder="Topic (e.g. listing claim, press, partnership)" name="topic" />
              <Textarea className="min-h-[160px] rounded-2xl border-[#c5d4c4] bg-white" placeholder="Tell us what you need, timelines, and any links that help." name="message" />
              <Button type="submit" className={`h-12 rounded-full text-sm font-semibold ${tone.action}`}>
                Send message
              </Button>
            </form>
            <p className={`mt-4 text-xs ${tone.muted}`}>
              By submitting, you agree we may store this communication to improve support quality. See{' '}
              <Link href="/privacy" className="font-medium text-[#1a472a] underline-offset-2 hover:underline">
                privacy
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
