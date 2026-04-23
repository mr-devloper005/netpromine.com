'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export function PageShell({
  title,
  description,
  actions,
  children,
}: {
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#fbfdfb] text-[#142018]">
      <NavbarShell />
      <main>
        <section className="border-b border-[#c5d4c4] bg-[linear-gradient(180deg,#e8f2ea_0%,#f4f7f3_100%)]">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4a5c4d]">Business directory</p>
                <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#0f2415] sm:text-5xl">{title}</h1>
                {description ? <p className="mt-4 text-base leading-relaxed text-[#4a5c4d] sm:text-lg">{description}</p> : null}
              </div>
              {actions ? <div className="flex flex-shrink-0 flex-wrap gap-3">{actions}</div> : null}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">{children}</section>
      </main>
      <Footer />
    </div>
  )
}
