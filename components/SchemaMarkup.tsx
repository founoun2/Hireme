interface JobPostingSchemaProps {
  title: string;
  description: string;
  company: string;
  companyLogo?: string;
  url: string;
  datePosted: string;
  validThrough?: string;
  employmentType?: string;
  jobLocation: string;
  baseSalary?: {
    min?: number;
    max?: number;
    currency?: string;
  };
}

export function JobPostingSchema({
  title,
  description,
  company,
  companyLogo,
  url,
  datePosted,
  validThrough,
  employmentType = 'FULL_TIME',
  jobLocation,
  baseSalary,
}: JobPostingSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title,
    description,
    datePosted,
    validThrough,
    employmentType,
    hiringOrganization: {
      '@type': 'Organization',
      name: company,
      ...(companyLogo && { logo: companyLogo }),
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: jobLocation,
        addressCountry: 'MA',
      },
    },
    url,
    ...(baseSalary && {
      baseSalary: {
        '@type': 'MonetaryAmount',
        currency: baseSalary.currency || 'MAD',
        value: {
          '@type': 'QuantitativeValue',
          ...(baseSalary.min && { minValue: baseSalary.min }),
          ...(baseSalary.max && { maxValue: baseSalary.max }),
          unitText: 'MONTH',
        },
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface OrganizationSchemaProps {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  address?: {
    street?: string;
    city?: string;
    region?: string;
    postalCode?: string;
  };
  contactPoint?: {
    telephone?: string;
    email?: string;
  };
}

export function OrganizationSchema({
  name,
  url,
  logo,
  description,
  address,
  contactPoint,
}: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    ...(logo && { logo }),
    ...(description && { description }),
    ...(address && {
      address: {
        '@type': 'PostalAddress',
        ...(address.street && { streetAddress: address.street }),
        ...(address.city && { addressLocality: address.city }),
        ...(address.region && { addressRegion: address.region }),
        ...(address.postalCode && { postalCode: address.postalCode }),
        addressCountry: 'MA',
      },
    }),
    ...(contactPoint && {
      contactPoint: {
        '@type': 'ContactPoint',
        ...(contactPoint.telephone && { telephone: contactPoint.telephone }),
        ...(contactPoint.email && { email: contactPoint.email }),
        contactType: 'customer service',
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbListSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbListSchema({ items }: BreadcrumbListSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQPageSchemaProps {
  items: FAQItem[];
}

export function FAQPageSchema({ items }: FAQPageSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  publisher: string;
  publisherLogo?: string;
}

export function ArticleSchema({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author,
  publisher,
  publisherLogo,
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    ...(image && { image }),
    datePublished,
    ...(dateModified && { dateModified }),
    author: {
      '@type': 'Organization',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: publisher,
      ...(publisherLogo && {
        logo: {
          '@type': 'ImageObject',
          url: publisherLogo,
        },
      }),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ItemListSchemaProps {
  name: string;
  description?: string;
  url: string;
  items: {
    name: string;
    url: string;
    position: number;
  }[];
}

export function ItemListSchema({ name, description, url, items }: ItemListSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    ...(description && { description }),
    url,
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      url: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
