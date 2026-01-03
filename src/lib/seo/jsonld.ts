import { BASE_URL } from "@/utils/constants";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TaskBuddy",
  alternateName: "TaskBuddy.dev",
  url: BASE_URL,
  logo: `${BASE_URL}/android-chrome-512x512.png`,
  description:
    "Effortless task management with customizable dashboards, drag & drop functionality, and powerful productivity tools.",
  founder: {
    "@type": "Person",
    name: "Stian Larsen",
    jobTitle: "Founder & CEO",
    email: "stian.larsen@mac.com",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "stian.larsen@mac.com",
  },
  sameAs: ["https://twitter.com/Litehode"],
};

export const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "TaskBuddy",
  url: BASE_URL,
  description:
    "Advanced task management application with customizable dashboards, drag & drop functionality, real-time updates, and powerful productivity features.",
  applicationCategory: "ProductivityApplication",
  operatingSystem: "Web Browser",
  browserRequirements: "Requires JavaScript. Requires HTML5.",
  softwareVersion: "1.0",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  featureList: [
    "Customizable Dashboards",
    "Drag & Drop Task Management",
    "Real-time Updates",
    "Advanced Task Search",
    "Keyboard Shortcuts",
    "Multi-device Synchronization",
    "Task Tags and Priorities",
    "Due Date Management",
    "Custom Sorting Options",
    "Responsive Layouts",
  ],
  screenshot: `${BASE_URL}/og.png`,
  author: {
    "@type": "Person",
    name: "Stian Larsen",
  },
  provider: {
    "@type": "Organization",
    name: "TaskBuddy",
    url: BASE_URL,
  },
};

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "TaskBuddy",
  description:
    "Comprehensive task management solution with drag & drop functionality, customizable dashboards, and advanced productivity features.",
  url: BASE_URL,
  applicationCategory: "Productivity",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    ratingCount: "1",
    bestRating: "5",
    worstRating: "1",
  },
  author: {
    "@type": "Person",
    name: "Stian Larsen",
  },
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is TaskBuddy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TaskBuddy is a comprehensive task management application that helps you organize, track, and complete your tasks efficiently with features like customizable dashboards, drag & drop functionality, and real-time updates.",
      },
    },
    {
      "@type": "Question",
      name: "How do I create and manage tasks in TaskBuddy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can easily create tasks, assign statuses (Created, In Progress, Completed), set priorities, add tags, and manage them through your personalized dashboard with drag & drop functionality.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use TaskBuddy on different devices?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, TaskBuddy offers a seamless multi-device experience with responsive layouts that work perfectly on desktop, tablet, and mobile devices.",
      },
    },
    {
      "@type": "Question",
      name: "Is TaskBuddy free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, TaskBuddy is currently free to use with all its powerful task management features available to all users.",
      },
    },
  ],
};

export const breadcrumbSchema = (
  items: Array<{ name: string; url: string }>,
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});
