// Edit this file to make the portfolio yours.

// Until this moment visitors see the "coming soon" countdown; after it, the real site.
// +08:00 = Philippine time. To preview the real site early, add ?preview to the URL.
export const launchDate = '2026-10-20T22:00:00+08:00'

export const profile = {
  name: 'Larry Lopez',
  handle: 'devrry',
  role: 'Freelance Full Stack Developer',
  roles: ['management systems', 'web apps', 'online stores', 'admin dashboards', 'booking systems'],
  location: 'Talavera, Nueva Ecija, Philippines',
  email: 'larrylopezmiguel@gmail.com',
  resume: '#',
  photo: '/larry.webp',
  logo: '/logo.png',
  tagline:
    "Hi, I'm Larry, also known as devrry. I'm a freelance full stack developer who builds custom systems for businesses, from the database to the last button, so you can focus on running your business.",
  about: [
    "I'm Larry Lopez, a freelance full stack developer from Talavera, Nueva Ecija, with 1.5 years of hands-on experience building web apps and systems for clients.",
    'I handle the whole project myself: planning, design, front end, back end, database and deployment. That means one point of contact, clear communication, and no hand-offs between teams.',
    'Whether you need a simple business website or a full management system, I build it to fit how your business actually works.',
  ],
  socials: {
    facebook: 'https://facebook.com/',
    github: 'https://github.com/',
    linkedin: 'https://linkedin.com/',
  },
}

export const stats = [
  { value: '1.5', label: 'Years freelancing' },
  { value: '10+', label: 'Projects delivered' },
  { value: '5+', label: 'Happy clients' },
  { value: '24h', label: 'Reply time' },
]

export const services = [
  {
    icon: 'layout',
    title: 'Custom Business Systems',
    description:
      'Inventory, POS, payroll, enrollment, booking and management systems built around your exact workflow.',
  },
  {
    icon: 'globe',
    title: 'Websites & Landing Pages',
    description: 'Fast, mobile-friendly websites that make your business look professional and bring in customers.',
  },
  {
    icon: 'cart',
    title: 'E-commerce Stores',
    description: 'Online shops with product management, cart, checkout and order tracking.',
  },
  {
    icon: 'chart',
    title: 'Admin Dashboards',
    description: 'Dashboards and reports that show your sales, users and operations at a glance.',
  },
  {
    icon: 'plug',
    title: 'APIs & Integrations',
    description: 'Connect your system to payment gateways, SMS, email, maps and other third-party services.',
  },
  {
    icon: 'wrench',
    title: 'Fixes & Maintenance',
    description: 'Bug fixes, new features, speed improvements and updates for your existing website or system.',
  },
]

// Highlighted banner under the services grid
export const capstone = {
  title: 'Capstone Projects',
  description:
    'IT or Computer Science student? I also build capstone systems: web-based management systems, booking, inventory, monitoring and more, built to fit your approved title and required features.',
  points: ['Built around your title and requirements', 'Clean, working system ready for your defense', 'Student-friendly quotes'],
}

export const process = [
  {
    title: 'Free consultation',
    description: 'Tell me about your business and what you need. We talk through goals, features and budget.',
  },
  {
    title: 'Proposal & quote',
    description: 'You get a clear scope, timeline and price before any work starts. No surprises.',
  },
  {
    title: 'Design & build',
    description: 'I build your system in stages and send regular updates so you can see progress and give feedback.',
  },
  {
    title: 'Launch & support',
    description: 'I deploy your system, walk you through how to use it, and stay available for fixes and updates.',
  },
]

export const skills = ['React', 'Next.js', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'PHP', 'MySQL', 'PostgreSQL', 'MongoDB', 'Git', 'REST APIs', 'Vercel']

export const projects = [
  {
    title: 'Inventory & POS System',
    description:
      'Point-of-sale and inventory system for a retail store, with stock alerts, sales reports and multi-user access.',
    tags: ['React', 'Node.js', 'MySQL'],
    live: '#',
    code: '#',
    featured: true,
  },
  {
    title: 'Online Booking System',
    description: 'Appointment booking for a service business with a calendar, email reminders and an admin panel.',
    tags: ['Next.js', 'PostgreSQL', 'Tailwind'],
    live: '#',
    code: '#',
  },
  {
    title: 'Business Website',
    description: 'Responsive company website with a services catalog, inquiry form and easy content updates.',
    tags: ['React', 'Tailwind', 'Vercel'],
    live: '#',
    code: '#',
  },
]

export const faqs = [
  {
    q: 'Do you accept capstone projects?',
    a: 'Yes. I build capstone systems for IT and Computer Science students. Send me your title, required features and defense date, and I will give you a quote and timeline.',
  },
  {
    q: 'How much does a system cost?',
    a: 'It depends on the features you need. After a free consultation I send a fixed quote, so you know the full price before any work starts.',
  },
  {
    q: 'How long will my project take?',
    a: 'A simple website usually takes 1 to 2 weeks. Custom systems take a few weeks to a couple of months depending on size. You get a timeline in the proposal.',
  },
  {
    q: 'Do you work with clients outside Nueva Ecija?',
    a: 'Yes. I work with clients anywhere in the Philippines, remotely through chat, email and video calls. For now I only take projects from Philippine-based clients.',
  },
  {
    q: 'What happens after my system is launched?',
    a: 'I help you get started and stay available for bug fixes, updates and new features whenever you need them.',
  },
  {
    q: 'How does payment work?',
    a: 'Usually a down payment to start, with the rest split across milestones. We agree on the terms before the project begins.',
  },
]

// Options for the "Start a project" form
export const inquiry = {
  // Web3Forms access key (public by design). Inquiries go to the email you registered it with.
  web3formsKey: '0ee60f77-2cab-484d-844b-9035a7e29b1e',
  projectTypes: ['Custom business system', 'Capstone project', 'Website / landing page', 'E-commerce store', 'Admin dashboard', 'API / integration', 'Fix or update existing system', 'Not sure yet'],
  budgets: ['Under ₱20,000', '₱20,000 – ₱50,000', '₱50,000 – ₱100,000', '₱100,000+', "Let's discuss"],
  timelines: ['ASAP', 'Within 1 month', '1 – 3 months', 'Flexible'],
}
