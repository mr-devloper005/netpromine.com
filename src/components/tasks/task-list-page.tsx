import Link from 'next/link'
import { ArrowRight, Building2, FileText, Image as ImageIcon, LayoutGrid, MapPin, Plus, ShieldCheck, Sparkles, Tag, User } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { TaskListClient } from '@/components/tasks/task-list-client'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG, getTaskConfig, type TaskKey } from '@/lib/site-config'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { taskIntroCopy } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { TASK_LIST_PAGE_OVERRIDE_ENABLED, TaskListPageOverride } from '@/overrides/task-list-page'

const taskIcons: Record<TaskKey, any> = {
  listing: Building2,
  article: FileText,
  image: ImageIcon,
  profile: User,
  classified: Tag,
  sbm: LayoutGrid,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const variantShells = {
  'listing-directory': 'bg-[linear-gradient(180deg,#e8f2ea_0%,#fbfdfb_100%)] text-[#142018]',
  'listing-showcase': 'bg-[linear-gradient(180deg,#edf5ee_0%,#fbfdfb_100%)] text-[#142018]',
  'article-editorial': 'bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.08),transparent_20%),linear-gradient(180deg,#fff8ef_0%,#ffffff_100%)]',
  'article-journal': 'bg-[linear-gradient(180deg,#fffdf9_0%,#f7f1ea_100%)]',
  'image-masonry': 'bg-[linear-gradient(180deg,#09101d_0%,#111c2f_100%)] text-white',
  'image-portfolio': 'bg-[linear-gradient(180deg,#07111f_0%,#13203a_100%)] text-white',
  'profile-creator': 'bg-[linear-gradient(180deg,#0a1120_0%,#101c34_100%)] text-white',
  'profile-business': 'bg-[linear-gradient(180deg,#f6fbff_0%,#ffffff_100%)]',
  'classified-bulletin': 'bg-[linear-gradient(180deg,#edf3e4_0%,#ffffff_100%)]',
  'classified-market': 'bg-[linear-gradient(180deg,#f4f6ef_0%,#ffffff_100%)]',
  'sbm-curation': 'bg-[linear-gradient(180deg,#fff7ee_0%,#ffffff_100%)]',
  'sbm-library': 'bg-[linear-gradient(180deg,#f7f8fc_0%,#ffffff_100%)]',
} as const

export async function TaskListPage({ task, category }: { task: TaskKey; category?: string }) {
  if (TASK_LIST_PAGE_OVERRIDE_ENABLED) {
    return await TaskListPageOverride({ task, category })
  }

  const taskConfig = getTaskConfig(task)
  const posts = await fetchTaskPosts(task, 30)
  const normalizedCategory = category ? normalizeCategory(category) : 'all'
  const intro = taskIntroCopy[task]
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const schemaItems = posts.slice(0, 10).map((post, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${baseUrl}${taskConfig?.route || '/posts'}/${post.slug}`,
    name: post.title,
  }))
  const { recipe } = getFactoryState()
  const layoutKey = recipe.taskLayouts[task as keyof typeof recipe.taskLayouts] || `${task}-${task === 'listing' ? 'directory' : 'editorial'}`
  const shellClass = variantShells[layoutKey as keyof typeof variantShells] || 'bg-background'
  const Icon = taskIcons[task] || LayoutGrid

  const isDark = ['image-masonry', 'image-portfolio', 'profile-creator'].includes(layoutKey)
  const isListingShell = layoutKey.startsWith('listing')
  const ui = isDark
    ? {
        muted: 'text-slate-300',
        panel: 'border border-white/10 bg-white/6',
        soft: 'border border-white/10 bg-white/5',
        input: 'border-white/10 bg-white/6 text-white',
        button: 'bg-white text-slate-950 hover:bg-slate-200',
      }
    : layoutKey.startsWith('article') || layoutKey.startsWith('sbm')
      ? {
          muted: 'text-[#72594a]',
          panel: 'border border-[#dbc6b6] bg-white/90',
          soft: 'border border-[#dbc6b6] bg-[#fff8ef]',
          input: 'border border-[#dbc6b6] bg-white text-[#2f1d16]',
          button: 'bg-[#2f1d16] text-[#fff4e4] hover:bg-[#452920]',
        }
      : isListingShell
        ? {
            muted: 'text-[#4a5c4d]',
            panel: 'border border-[#c5d4c4] bg-white shadow-[0_20px_50px_rgba(20,32,24,0.06)]',
            soft: 'border border-[#d5e3d4] bg-[#f4faf4]',
            input: 'border border-[#c5d4c4] bg-white text-[#142018]',
            button: 'bg-[#1a472a] text-white hover:bg-[#143620]',
          }
        : {
            muted: 'text-slate-600',
            panel: 'border border-slate-200 bg-white',
            soft: 'border border-slate-200 bg-slate-50',
            input: 'border border-slate-200 bg-white text-slate-950',
            button: 'bg-slate-950 text-white hover:bg-slate-800',
          }

  return (
    <div className={`min-h-screen ${shellClass}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {task === 'listing' ? (
          <SchemaJsonLd
            data={[
              {
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                name: 'Business Directory Listings',
                itemListElement: schemaItems,
              },
              {
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: SITE_CONFIG.name,
                url: `${baseUrl}/listings`,
                areaServed: 'Worldwide',
              },
            ]}
          />
        ) : null}
        {task === 'article' || task === 'classified' ? (
          <SchemaJsonLd
            data={{
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: `${taskConfig?.label || task} | ${SITE_CONFIG.name}`,
              url: `${baseUrl}${taskConfig?.route || ''}`,
              hasPart: schemaItems,
            }}
          />
        ) : null}

        {layoutKey === 'listing-directory' || layoutKey === 'listing-showcase' ? (
          <>
            <section className="mb-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
              <div className={`flex flex-col justify-between rounded-[2rem] p-8 shadow-[0_24px_70px_rgba(20,32,24,0.08)] ${ui.panel}`}>
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#1a472a]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1a472a]">
                    <Icon className="h-3.5 w-3.5" />
                    {taskConfig?.label || task}
                  </span>
                  <h1 className="mt-5 text-4xl font-bold tracking-tight text-[#0f2415] sm:text-5xl">Find trusted businesses, fast.</h1>
                  <p className={`mt-4 max-w-2xl text-sm leading-7 sm:text-base ${ui.muted}`}>
                    {taskConfig?.description || 'Browse verified listings with clear categories, locations, and contact paths.'} Use filters to narrow by industry or city, then open a profile to go deeper.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={`/create/${task}`} className="inline-flex items-center gap-2 rounded-full bg-[#e98b2a] px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#d97a1f]">
                    <Plus className="h-4 w-4" />
                    Create listing
                  </Link>
                  <Link href="/search" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${ui.soft}`}>
                    Open search
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {[
                    { icon: Building2, label: 'Verified businesses', value: '8.6k+' },
                    { icon: MapPin, label: 'Cities covered', value: '120+' },
                    { icon: ShieldCheck, label: 'Quality reviewed', value: 'Daily' },
                  ].map((stat) => (
                    <div key={stat.label} className={`rounded-2xl p-4 ${ui.soft}`}>
                      <stat.icon className="h-4 w-4 text-[#1a472a]" />
                      <p className="mt-3 text-lg font-bold text-[#0f2415]">{stat.value}</p>
                      <p className={`text-xs font-medium uppercase tracking-wide ${ui.muted}`}>{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <form className={`flex flex-col justify-between gap-4 rounded-[2rem] p-7 shadow-[0_18px_50px_rgba(20,32,24,0.06)] ${ui.soft}`} action={taskConfig?.route || '#'}>
                <div>
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#1a472a]">
                    <Sparkles className="h-3.5 w-3.5" />
                    Refine results
                  </p>
                  <h2 className="mt-3 text-xl font-bold text-[#0f2415]">Filter the directory</h2>
                  <p className={`mt-2 text-sm ${ui.muted}`}>Pick a category to narrow the grid below. Combine with keyword search for tighter results.</p>
                </div>

                <div className="grid gap-3">
                  <div>
                    <label className={`text-xs font-semibold uppercase tracking-[0.18em] ${ui.muted}`}>Category</label>
                    <select name="category" defaultValue={normalizedCategory} className={`mt-2 h-12 w-full rounded-xl px-3 text-sm ${ui.input}`}>
                      <option value="all">All categories</option>
                      {CATEGORY_OPTIONS.map((item) => (
                        <option key={item.slug} value={item.slug}>{item.name}</option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className={`h-12 rounded-full text-sm font-semibold ${ui.button}`}>Apply filters</button>
                  <Link href={taskConfig?.route || '/listings'} className={`inline-flex h-11 items-center justify-center rounded-full text-sm font-medium ${ui.soft}`}>
                    Reset filters
                  </Link>
                </div>
              </form>
            </section>

            <section className="mb-10">
              <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.22em] ${ui.muted}`}>Quick categories</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'All', slug: '' },
                  { label: 'Retail', slug: 'shopping' },
                  { label: 'Healthcare', slug: 'health' },
                  { label: 'Technology', slug: 'technology' },
                  { label: 'Finance', slug: 'finance' },
                  { label: 'Real estate', slug: 'real-estate' },
                  { label: 'Hospitality', slug: 'travel' },
                  { label: 'Professional services', slug: 'service' },
                ].map((chip) => {
                  const href = chip.slug ? `${taskConfig?.route || '/listings'}?category=${chip.slug}` : taskConfig?.route || '/listings'
                  const active = (chip.slug && normalizedCategory === chip.slug) || (!chip.slug && normalizedCategory === 'all')
                  return (
                    <Link
                      key={chip.label}
                      href={href}
                      className={
                        active
                          ? 'rounded-full bg-[#1a472a] px-4 py-2 text-sm font-semibold text-white shadow-sm'
                          : `rounded-full px-4 py-2 text-sm font-semibold transition hover:border-[#1a472a]/40 ${ui.soft}`
                      }
                    >
                      {chip.label}
                    </Link>
                  )
                })}
              </div>
            </section>

            <section className="mb-8 flex flex-col gap-3 border-b border-[#c5d4c4] pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${ui.muted}`}>Browse</p>
                <h2 className="mt-1 text-2xl font-bold text-[#0f2415]">
                  {normalizedCategory === 'all'
                    ? `All ${taskConfig?.label?.toLowerCase() || 'listings'}`
                    : `${CATEGORY_OPTIONS.find((c) => c.slug === normalizedCategory)?.name || normalizedCategory} listings`}
                </h2>
              </div>
              <Link href={`/create/${task}`} className="inline-flex items-center gap-2 self-start rounded-full border border-[#1a472a] bg-white px-4 py-2 text-sm font-semibold text-[#1a472a] hover:bg-[#eef5ed] sm:self-auto">
                <Plus className="h-4 w-4" />
                Add your business
              </Link>
            </section>
          </>
        ) : null}

        {layoutKey === 'article-editorial' || layoutKey === 'article-journal' ? (
          <section className="mb-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-foreground">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>This reading surface uses slower pacing, stronger typographic hierarchy, and more breathing room so long-form content feels intentional rather than squeezed into a generic feed.</p>
            </div>
            <div className={`rounded-[2rem] p-6 ${ui.panel}`}>
              <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${ui.muted}`}>Reading note</p>
              <p className={`mt-4 text-sm leading-7 ${ui.muted}`}>Use category filters to jump between topics without collapsing the page into the same repeated card rhythm used by other task types.</p>
              <form className="mt-5 flex items-center gap-3" action={taskConfig?.route || '#'}>
                <select name="category" defaultValue={normalizedCategory} className={`h-11 flex-1 rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
                <button type="submit" className={`h-11 rounded-xl px-4 text-sm font-medium ${ui.button}`}>Apply</button>
              </form>
            </div>
          </section>
        ) : null}

        {layoutKey === 'image-masonry' || layoutKey === 'image-portfolio' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${ui.soft}`}>
                <Icon className="h-3.5 w-3.5" /> Visual feed
              </div>
              <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em]">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>This surface leans into stronger imagery, larger modules, and more expressive spacing so visual content feels materially different from reading and directory pages.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className={`min-h-[220px] rounded-[2rem] ${ui.panel}`} />
              <div className={`min-h-[220px] rounded-[2rem] ${ui.soft}`} />
              <div className={`col-span-2 min-h-[120px] rounded-[2rem] ${ui.panel}`} />
            </div>
          </section>
        ) : null}

        {layoutKey === 'profile-creator' || layoutKey === 'profile-business' ? (
          <section className={`mb-12 rounded-[2.2rem] p-8 shadow-[0_24px_70px_rgba(15,23,42,0.1)] ${ui.panel}`}>
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div className={`min-h-[240px] rounded-[2rem] ${ui.soft}`} />
              <div>
                <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
                <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">Profiles with stronger identity, trust, and reputation cues.</h1>
                <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>This layout prioritizes the person or business surface first, then lets the feed continue below without borrowing the same visual logic used by articles or listings.</p>
              </div>
            </div>
          </section>
        ) : null}

        {layoutKey === 'classified-bulletin' || layoutKey === 'classified-market' ? (
          <section className="mb-12 grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className={`rounded-[1.8rem] p-6 ${ui.panel}`}>
              <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">Fast-moving notices, offers, and responses in a compact board format.</h1>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {['Quick to scan', 'Shorter response path', 'Clearer urgency cues'].map((item) => (
                <div key={item} className={`rounded-[1.5rem] p-5 ${ui.soft}`}>
                  <p className="text-sm font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {layoutKey === 'sbm-curation' || layoutKey === 'sbm-library' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">Curated resources arranged more like collections than a generic post feed.</h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>Bookmarks, saved resources, and reference-style items need calmer grouping and lighter metadata. This variant gives them that separation.</p>
            </div>
            <div className={`rounded-[2rem] p-6 ${ui.panel}`}>
              <p className={`text-xs uppercase tracking-[0.24em] ${ui.muted}`}>Collection filter</p>
              <form className="mt-4 flex items-center gap-3" action={taskConfig?.route || '#'}>
                <select name="category" defaultValue={normalizedCategory} className={`h-11 flex-1 rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
                <button type="submit" className={`h-11 rounded-xl px-4 text-sm font-medium ${ui.button}`}>Apply</button>
              </form>
            </div>
          </section>
        ) : null}

        {intro ? (
          <section className={`mb-12 rounded-[2rem] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-8 ${ui.panel}`}>
            <h2 className="text-2xl font-semibold text-foreground">{intro.title}</h2>
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className={`mt-4 text-sm leading-7 ${ui.muted}`}>{paragraph}</p>
            ))}
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              {intro.links.map((link) => (
                <a key={link.href} href={link.href} className="font-semibold text-foreground hover:underline">{link.label}</a>
              ))}
            </div>
          </section>
        ) : null}

        <TaskListClient task={task} initialPosts={posts} category={normalizedCategory} />
      </main>
      <Footer />
    </div>
  )
}
