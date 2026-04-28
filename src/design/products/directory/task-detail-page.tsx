import Link from 'next/link'
import { ArrowRight, Globe, Mail, MapPin, Phone, Tag } from 'lucide-react'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { RichContent, formatRichHtml } from '@/components/shared/rich-content'
import { DirectoryImageGallery } from '@/components/tasks/directory-image-gallery'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey
  taskLabel: string
  taskRoute: string
  post: SitePost
  description: string
  category: string
  images: string[]
  mapEmbedUrl: string | null
  related: SitePost[]
}) {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []
  const descriptionHtml = formatRichHtml(description, 'Details coming soon.')

  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: `${taskRoute}/${post.slug}`,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  }

  return (
    <div className="min-h-screen bg-[#f9fafc] text-slate-950">
      <SchemaJsonLd data={schemaPayload} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href={taskRoute} className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-950">
          &larr; Back to {taskLabel}
        </Link>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,0.06)] sm:p-8">
          <div className="border-b border-slate-200 pb-5">
            <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">{post.title}</h1>
            {location ? <p className="mt-3 text-lg font-semibold text-slate-800">Location: {location}</p> : null}
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-600">
              <span>
                <span className="font-semibold text-slate-800">Category:</span> {category || taskLabel}
              </span>
            </div>
          </div>

          <div className="mt-7 grid gap-6 xl:grid-cols-[1.35fr_1fr]">
            <DirectoryImageGallery images={images} title={post.title} />

            <div className="space-y-5">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <RichContent html={descriptionHtml} className="text-slate-700 prose-p:my-3 prose-a:text-blue-700" />
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Details</p>
                <div className="mt-4 space-y-3">
                  {location ? (
                    <div className="flex items-start gap-3 text-sm text-slate-700">
                      <MapPin className="mt-0.5 h-4 w-4 text-slate-500" />
                      <span>{location}</span>
                    </div>
                  ) : null}
                  {website ? (
                    <div className="flex items-start gap-3 text-sm text-slate-700">
                      <Globe className="mt-0.5 h-4 w-4 text-slate-500" />
                      <a href={website} target="_blank" rel="noreferrer" className="break-all text-blue-700 hover:underline">
                        Website
                      </a>
                    </div>
                  ) : null}
                  {email ? (
                    <div className="flex items-start gap-3 text-sm text-slate-700">
                      <Mail className="mt-0.5 h-4 w-4 text-slate-500" />
                      <a href={`mailto:${email}`} className="break-all text-blue-700 hover:underline">
                        {email}
                      </a>
                    </div>
                  ) : null}
                  {phone ? (
                    <div className="flex items-start gap-3 text-sm text-slate-700">
                      <Phone className="mt-0.5 h-4 w-4 text-slate-500" />
                      <span>{phone}</span>
                    </div>
                  ) : null}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {website ? (
                    <a href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#0f4e8a] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0c4274]">
                      Visit website <ArrowRight className="h-4 w-4" />
                    </a>
                  ) : null}
                  <Link href={taskRoute} className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                    Browse more
                  </Link>
                </div>
              </div>

              {highlights.length ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Highlights</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-700">
                    {highlights.slice(0, 6).map((item) => (
                      <li key={item}>- {item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {mapEmbedUrl ? (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <div className="border-b border-slate-200 px-5 py-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Location map</p>
                  </div>
                  <iframe src={mapEmbedUrl} title={`${post.title} map`} className="h-[260px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-7 border-t border-slate-200 pt-6">
            <div className="rounded-2xl border border-slate-200 bg-[#f7f9fc] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">About this {task}</p>
              <RichContent html={descriptionHtml} className="mt-3 text-sm leading-7 text-slate-700 prose-p:my-2 prose-a:text-blue-700" />
            </div>
          </div>
        </section>

        {related.length ? (
          <section className="mt-12">
            <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Related</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">More in {category || taskLabel}</h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                <Tag className="h-3.5 w-3.5" /> {taskLabel}
              </span>
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}


