import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Trusted business directory',
  },
  footer: {
    tagline: 'Discover companies, services, and local opportunities',
  },
  hero: {
    badge: 'Featured industries & regions',
    title: ['Find the right', 'business, faster.'],
    description:
      'Browse verified listings by category and location. Compare services, read trust signals, and connect with companies that fit what you need—without wading through unrelated content types.',
    primaryCta: {
      label: 'Browse directory',
      href: '/listings',
    },
    secondaryCta: {
      label: 'List your business',
      href: '/register',
    },
    searchPlaceholder: 'Search businesses, categories, and locations',
    focusLabel: 'Industry',
    featureCardBadge: 'Directory spotlight',
    featureCardTitle: 'Structured listings stay at the center of the experience.',
    featureCardDescription:
      'Categories, locations, and ratings help you scan quickly while deeper detail stays one click away.',
  },
  home: {
    metadata: {
      title: 'Business directory and local listings',
      description:
        'Explore verified business listings, industries, and locations in one focused directory experience.',
      openGraphTitle: 'Business directory and local listings',
      openGraphDescription:
        'Discover companies and services with clear categories, locations, and trust cues.',
      keywords: ['business directory', 'listings', 'local businesses', 'B2B', 'company search'],
    },
    introBadge: 'About this directory',
    introTitle: 'One place for business discovery—built for clarity, not clutter.',
    introParagraphs: [
      'This site is focused on business listings: structured profiles you can filter by industry, region, and relevance.',
      'Navigation stays tight so visitors land on directories, categories, and featured businesses instead of unrelated content silos.',
      'Whether you are comparing vendors or listing your own company, the layout keeps actions obvious and the reading rhythm calm.',
    ],
    sideBadge: 'Why it works',
    sidePoints: [
      'Listing-first layout with strong category and location cues.',
      'Featured businesses and search without magazine-style noise.',
      'Simple paths to contact, save, or claim a listing.',
      'Fast, lightweight pages that stay readable on every device.',
    ],
    primaryLink: {
      label: 'Open directory',
      href: '/listings',
    },
    secondaryLink: {
      label: 'Add your listing',
      href: '/register',
    },
  },
  cta: {
    badge: 'Grow your presence',
    title: 'Ready to put your business in front of people who are already searching?',
    description:
      'Claim a listing, keep hours and contact info current, and show up alongside peers in your industry.',
    primaryCta: {
      label: 'Create free account',
      href: '/register',
    },
    secondaryCta: {
      label: 'Talk to us',
      href: '/contact',
    },
  },
  taskSectionHeading: 'Featured {label}',
  taskSectionDescriptionSuffix: 'Hand-picked listings and timely updates in this section.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles and stories',
    description: 'Read articles, stories, guides, and long-form posts across topics and interests.',
  },
  listing: {
    title: 'Business directory',
    description: 'Browse companies, services, and structured listings organized for quick comparison.',
  },
  classified: {
    title: 'Classifieds and announcements',
    description: 'Browse classifieds, offers, notices, and time-sensitive posts across categories.',
  },
  image: {
    title: 'Images and visual posts',
    description: 'Explore image-led posts, galleries, and visual stories from across the platform.',
  },
  profile: {
    title: 'Profiles and public pages',
    description: 'Discover public profiles, brand pages, and identity-focused posts in one place.',
  },
  sbm: {
    title: 'Curated links and saved resources',
    description: 'Browse useful links, saved references, and curated resources organized for discovery.',
  },
  pdf: {
    title: 'PDFs and downloadable resources',
    description: 'Open reports, documents, and downloadable resources shared across the platform.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Business listings and directory pages',
    paragraphs: [
      'Explore companies and services with category, location, and trust metadata so you can compare options quickly.',
      'Each listing is built to answer the basics first—what they do, where they operate, and how to take the next step.',
      'Use filters and search to narrow the directory, then open individual pages for full detail.',
    ],
    links: [
      { label: 'Browse all listings', href: '/listings' },
      { label: 'Search the directory', href: '/search' },
      { label: 'List your business', href: '/register' },
    ],
  },
  article: {
    title: 'Articles, stories, and long-form reading',
    paragraphs: [
      'This section is built for stories, explainers, guides, and long-form reading across topics and interests.',
      'Articles connect with listings, images, resources, and other content types so deeper reading can lead naturally into related discovery.',
      'Use this section to browse thoughtful posts, revisit useful writing, and move into supporting content when you want more context.',
    ],
    links: [
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open images', href: '/images' },
      { label: 'Browse resources', href: '/pdf' },
    ],
  },
  classified: {
    title: 'Classifieds, offers, and timely updates',
    paragraphs: [
      'Classified posts help surface offers, notices, deals, and time-sensitive opportunities in a faster-scanning format.',
      'They work well alongside articles, listings, and profiles, making it easier to connect short-term posts with more structured content.',
      'Browse by category to find announcements quickly, then continue into related sections when you need more detail.',
    ],
    links: [
      { label: 'Business listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  image: {
    title: 'Image-led posts and visual stories',
    paragraphs: [
      'Images take the lead in this section through galleries, visual posts, and story-led content where imagery carries the experience.',
      'These posts connect with articles, listings, and other sections so visuals can act as entry points into deeper content.',
      'Browse the latest visual updates, then continue into related stories or supporting pages for more context.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open classifieds', href: '/classifieds' },
    ],
  },
  profile: {
    title: 'Profiles, identities, and public pages',
    paragraphs: [
      'Profiles capture the identity behind a business, creator, brand, or project and help visitors understand who is behind the content they are exploring.',
      'These pages work as trust anchors across the site and connect naturally with stories, listings, documents, and other post types.',
      'Browse profiles to understand people and brands more clearly, then continue into related content from the same source.',
    ],
    links: [
      { label: 'Open listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'Browse images', href: '/images' },
    ],
  },
  sbm: {
    title: 'Curated links and bookmarked resources',
    paragraphs: [
      'This section collects useful links, references, tools, and saved resources in a text-first browsing format.',
      'Bookmarks stay connected to the rest of the platform, making it easier to move from a saved link into related stories, listings, or resources.',
      'Use this section to organize helpful sources and discover connected content without leaving the broader site experience.',
    ],
    links: [
      { label: 'Browse articles', href: '/articles' },
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open PDFs', href: '/pdf' },
    ],
  },
  pdf: {
    title: 'PDFs, documents, and downloadable files',
    paragraphs: [
      'The PDF library hosts reports, guides, downloadable files, and longer-form document resources that support reading and discovery.',
      'These resources work alongside stories, listings, and profiles, helping document-style content stay connected to the rest of the platform.',
      'Browse by category to find relevant files quickly, then continue into related sections when you want more context.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'See listings', href: '/listings' },
      { label: 'Explore profiles', href: '/profile' },
    ],
  },
  social: {
    title: 'Short updates and community signals',
    paragraphs: [
      'Short updates add quick signals that keep activity flowing across the platform.',
      'They work well with stories, listings, and resources by helping visitors move from brief updates into deeper content.',
      'Use these posts as lightweight entry points into the broader site experience.',
    ],
    links: [
      { label: 'Open listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'View PDFs', href: '/pdf' },
    ],
  },
  comment: {
    title: 'Comments and contextual responses',
    paragraphs: [
      'Comments surface responses connected directly to articles and help keep discussion close to the writing it belongs to.',
      'This layer adds perspective and reaction without needing a separate standalone content format.',
      'Use comments as supporting context beneath stories, then continue exploring related content from the same topic area.',
    ],
    links: [
      { label: 'Explore articles', href: '/articles' },
      { label: 'View listings', href: '/listings' },
      { label: 'See classifieds', href: '/classifieds' },
    ],
  },
  org: {
    title: 'Organizations, teams, and structured entities',
    paragraphs: [
      'Organization pages provide structured identity surfaces for teams, brands, communities, and agencies.',
      'Used with listings, stories, profiles, and resources, they help create stronger structure across the platform.',
      'Connect organization pages with related content to build a clearer and more unified site presence.',
    ],
    links: [
      { label: 'Business listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'PDF library', href: '/pdf' },
    ],
  },
}
