
import React from 'react';

export interface Job {
  id: number;
  title: string;
  company: string;
  city: string;
  contract: string;
  time: string;
  isNew: boolean;
  description: string;
  requirements?: string[];
  tasks?: string[];
  salary?: string;
  email?: string;
  contactPhone?: string;
  company_email?: string;    // NEW: Scraped company email
  company_phone?: string;    // NEW: Scraped company phone
  company_website?: string;  // NEW: Scraped company website
  url: string; // The original source link
  created_at?: string; // Database timestamp
  location?: string; // City/location
  category?: string; // AI-categorized job type
  skills?: string[]; // AI-extracted skills
  summary?: string; // AI-generated summary
}

export type SidebarKey = 'legal' | 'privacy' | 'postJob' | null;

export interface SidebarContent {
  title: string;
  body: React.ReactNode;
}
