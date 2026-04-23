'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { Newspaper } from 'lucide-react'
import { mockPressAssets, mockPressCoverage } from '@/data/mock-data'
import { SITE_CONFIG } from '@/lib/site-config'

export default function PressPage() {
  const { toast } = useToast()
  const [activeAssetId, setActiveAssetId] = useState<string | null>(null)
  const activeAsset = mockPressAssets.find((asset) => asset.id === activeAssetId)

  return (
    <PageShell
      title="Press room"
      description="Brand assets, product imagery, and recent coverage of our business directory platform."
      actions={
        <Button variant="outline" asChild className="rounded-full border-[#c5d4c4] bg-white text-[#1a472a] hover:bg-[#eef5ed]">
          <Link href="/contact">Press inquiries</Link>
        </Button>
      }
    >
      <div className="mb-10 rounded-[2rem] border border-[#c5d4c4] bg-[#1a472a] p-8 text-white shadow-sm lg:flex lg:items-center lg:justify-between lg:gap-8">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-100">
            <Newspaper className="h-4 w-4" />
            Media
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight">Talking about modern business discovery</h2>
          <p className="mt-3 text-sm leading-relaxed text-emerald-100/95">
            Journalists use this page to download approved logos, screenshots, and short boilerplate about how we help companies get found.
          </p>
        </div>
        <Button asChild className="mt-6 shrink-0 rounded-full bg-[#e98b2a] text-white hover:bg-[#d97a1f] lg:mt-0">
          <Link href={`mailto:press@${SITE_CONFIG.domain}`}>Email the press desk</Link>
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-[#c5d4c4] bg-white shadow-sm">
          <CardContent className="space-y-4 p-8">
            <h2 className="text-xl font-bold text-[#0f2415]">Press kit downloads</h2>
            <p className="text-sm leading-relaxed text-[#4a5c4d]">Approved assets for articles, decks, and event signage. Prefer SVG logos when possible.</p>
            <div className="grid gap-3">
              {mockPressAssets.map((asset) => (
                <div key={asset.id} className="rounded-2xl border border-[#d5e3d4] bg-[#f4faf4] px-4 py-4">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-medium text-[#0f2415]">{asset.title}</p>
                      <p className="mt-1 text-xs text-[#4a5c4d]">{asset.description}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className="border-0 bg-[#1a472a]/10 text-[#1a472a]">{asset.fileType}</Badge>
                      <Button size="sm" variant="outline" className="rounded-full border-[#c5d4c4]" onClick={() => setActiveAssetId(asset.id)}>
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        className="rounded-full bg-[#1a472a] text-white hover:bg-[#143620]"
                        onClick={() =>
                          toast({
                            title: 'Download started',
                            description: `${asset.title} is downloading.`,
                          })
                        }
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4a5c4d]">Recent coverage</p>
          {mockPressCoverage.map((item) => (
            <Card key={item.id} className="border-[#c5d4c4] bg-white shadow-sm transition-transform hover:-translate-y-0.5">
              <CardContent className="p-6">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#4a5c4d]">{item.outlet}</div>
                <p className="mt-2 text-base font-medium leading-snug text-[#0f2415]">{item.headline}</p>
                <p className="mt-2 text-xs text-[#4a5c4d]">{item.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={Boolean(activeAsset)} onOpenChange={() => setActiveAssetId(null)}>
        <DialogContent className="max-w-3xl border-[#c5d4c4]">
          <DialogHeader>
            <DialogTitle className="text-[#0f2415]">{activeAsset?.title}</DialogTitle>
          </DialogHeader>
          {activeAsset?.previewUrl ? (
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-[#d5e3d4] bg-[#f4faf4]">
              <Image src={activeAsset.previewUrl} alt={activeAsset.title} fill className="object-cover" />
            </div>
          ) : null}
          <p className="text-sm text-[#4a5c4d]">{activeAsset?.description}</p>
          <DialogFooter>
            <Button variant="outline" className="rounded-full border-[#c5d4c4]" onClick={() => setActiveAssetId(null)}>
              Close
            </Button>
            <Button
              className="rounded-full bg-[#1a472a] text-white hover:bg-[#143620]"
              onClick={() =>
                toast({
                  title: 'Download started',
                  description: `${activeAsset?.title} is downloading.`,
                })
              }
            >
              Download {activeAsset?.fileType}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageShell>
  )
}
