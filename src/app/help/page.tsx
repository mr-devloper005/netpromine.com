import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { BookOpen, ListChecks, Search } from 'lucide-react'

const topics = [
  {
    title: 'Listings & profiles',
    description: 'Create a listing, choose the right category, and keep contact details and hours accurate.',
  },
  {
    title: 'Search & filters',
    description: 'Combine industry, location, and keyword search to narrow results without losing context.',
  },
  {
    title: 'Plans & billing',
    description: 'Understand what is included in each tier and how to upgrade when you need more visibility.',
  },
  {
    title: 'Trust & verification',
    description: 'Learn how badges work and what documentation may be required for certain categories.',
  },
]

const directoryFaqs = [
  {
    id: 'faq-dir-1',
    question: 'How do I add my business to the directory?',
    answer: 'Create an account, open your dashboard, and choose “Create listing.” Complete the category, service area, and contact sections—then publish when you are ready.',
  },
  {
    id: 'faq-dir-2',
    question: 'Can I edit my listing after it goes live?',
    answer: 'Yes. Signed-in owners can update descriptions, photos, hours, and links at any time. Changes appear immediately on your public profile.',
  },
  {
    id: 'faq-dir-3',
    question: 'How do customers find my company?',
    answer: 'Listings appear in category browse, site search, and on your direct URL. Strong categories and clear service areas improve discovery.',
  },
  {
    id: 'faq-dir-4',
    question: 'Who can I contact for billing or partnership questions?',
    answer: 'Use the contact form and pick the topic that best matches your request—we route partnership, press, and support mail separately.',
  },
]

export default function HelpPage() {
  return (
    <PageShell
      title="Help center"
      description="Guides and answers for businesses listing on the directory and for teams using search every day."
      actions={
        <Button asChild className="rounded-full bg-[#1a472a] text-white hover:bg-[#143620]">
          <Link href="/contact">Contact support</Link>
        </Button>
      }
    >
      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        <Card className="border-[#c5d4c4] bg-white shadow-sm sm:col-span-1">
          <CardContent className="flex flex-col gap-3 p-6">
            <Search className="h-8 w-8 text-[#1a472a]" />
            <h2 className="text-lg font-bold text-[#0f2415]">Search tips</h2>
            <p className="text-sm leading-relaxed text-[#4a5c4d]">Start broad, then layer category and city filters. Use quotes for exact business names.</p>
            <Button variant="link" className="h-auto justify-start p-0 text-[#1a472a]" asChild>
              <Link href="/search">Open search →</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="border-[#c5d4c4] bg-white shadow-sm sm:col-span-1">
          <CardContent className="flex flex-col gap-3 p-6">
            <ListChecks className="h-8 w-8 text-[#1a472a]" />
            <h2 className="text-lg font-bold text-[#0f2415]">Listing checklist</h2>
            <p className="text-sm leading-relaxed text-[#4a5c4d]">Logo, short description, service area, and one clear call-to-action make the strongest profiles.</p>
            <Button variant="link" className="h-auto justify-start p-0 text-[#1a472a]" asChild>
              <Link href="/listings">Browse examples →</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="border-[#c5d4c4] bg-white shadow-sm sm:col-span-1">
          <CardContent className="flex flex-col gap-3 p-6">
            <BookOpen className="h-8 w-8 text-[#e98b2a]" />
            <h2 className="text-lg font-bold text-[#0f2415]">Product updates</h2>
            <p className="text-sm leading-relaxed text-[#4a5c4d]">Release notes and best practices for teams rolling out the directory internally.</p>
            <Button variant="link" className="h-auto justify-start p-0 text-[#1a472a]" asChild>
              <Link href="/about">Read more about the platform →</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4a5c4d]">Topic guides</p>
          <h2 className="mt-2 text-2xl font-bold text-[#0f2415]">Popular starting points</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {topics.map((topic) => (
              <Card key={topic.title} className="border-[#c5d4c4] bg-white shadow-sm transition-transform hover:-translate-y-0.5">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-[#0f2415]">{topic.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4a5c4d]">{topic.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <Card className="border-[#c5d4c4] bg-[#f4faf4] shadow-sm">
          <CardContent className="p-7">
            <h3 className="text-lg font-bold text-[#0f2415]">Frequently asked questions</h3>
            <Accordion type="single" collapsible className="mt-4">
              {directoryFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border-[#d5e3d4]">
                  <AccordionTrigger className="text-left text-[#0f2415] hover:no-underline">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-[#4a5c4d]">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
