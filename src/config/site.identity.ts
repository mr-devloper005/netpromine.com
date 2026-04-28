export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'w6iv4fqi8l',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Netpromine',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Business Listing platform',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'A business listing platform for discovering services, companies, and local opportunities with structured browsing.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'netpromine.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://netpromine.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'support@netpromine.com',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const

