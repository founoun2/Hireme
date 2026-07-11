import Link from "next/link";

interface RelatedItem {
  title: string;
  description: string;
  href: string;
  image?: string;
}

interface RelatedContentProps {
  items: RelatedItem[];
}

export function RelatedContent({ items }: RelatedContentProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group block bg-white rounded-xl border border-zinc-100 overflow-hidden hover:shadow-lg hover:border-[#c1272d]/20 transition-all duration-300"
        >
          {item.image ? (
            <div className="aspect-[16/9] bg-zinc-100 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ) : (
            <div className="aspect-[16/9] bg-gradient-to-br from-[#c1272d]/10 to-[#006233]/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-[#c1272d]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V4.5a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v15a1.5 1.5 0 001.5 1.5z" />
              </svg>
            </div>
          )}
          <div className="p-4">
            <h3 className="text-sm font-bold text-zinc-900 group-hover:text-[#c1272d] transition-colors line-clamp-2 mb-1.5">
              {item.title}
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
              {item.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
