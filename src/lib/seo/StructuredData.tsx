import {
  breadcrumbSchema,
  faqSchema,
  organizationSchema,
  softwareApplicationSchema,
  webApplicationSchema,
} from "@/lib/seo/jsonld";

interface StructuredDataProps {
  schema: object;
}

export function StructuredData({ schema }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function OrganizationStructuredData() {
  return <StructuredData schema={organizationSchema} />;
}

export function WebApplicationStructuredData() {
  return <StructuredData schema={webApplicationSchema} />;
}

export function SoftwareApplicationStructuredData() {
  return <StructuredData schema={softwareApplicationSchema} />;
}

export function FAQStructuredData() {
  return <StructuredData schema={faqSchema} />;
}

export function BreadcrumbStructuredData({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  return <StructuredData schema={breadcrumbSchema(items)} />;
}
