import React from 'react';
import { Job } from '../types';

interface JobPostingSchemaProps {
  job: Job;
}

export default function JobPostingSchema({ job }: JobPostingSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: job.created_at || new Date().toISOString(),
    validThrough: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    hiringOrganization: {
      '@type': 'Organization',
      name: job.company,
      sameAs: job.company_website || undefined
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.city || job.location || 'Casablanca',
        addressCountry: 'MA'
      }
    },
    employmentType: job.contract || 'FULL_TIME',
    baseSalary: job.salary ? {
      '@type': 'MonetaryAmount',
      currency: 'MAD',
      value: {
        '@type': 'QuantitativeValue',
        value: job.salary,
        unitText: 'MONTH'
      }
    } : undefined
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
