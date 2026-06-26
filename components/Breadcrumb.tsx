import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Fil d'Ariane" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs font-bold text-zinc-400">
        <li>
          <Link to="/" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
            <i className="fa fa-home text-[10px]"></i>
            <span>Accueil</span>
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <i className="fa fa-chevron-right text-[8px] text-zinc-300"></i>
            {item.path ? (
              <Link to={item.path} className="hover:text-indigo-600 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-zinc-700">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
