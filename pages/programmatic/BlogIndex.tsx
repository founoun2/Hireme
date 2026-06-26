import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../../hooks/useSEO';
import { BLOG_POSTS } from '../../seo/seoData';

const BlogIndex: React.FC = () => {
  useSEO({
    title: 'Blog - Conseils Emploi et Marché du Travail au Maroc',
    description: 'Articles, conseils et guides pour réussir votre recherche d\'emploi au Maroc. Astuces CV, entretien, salaires et tendances du marché.',
    canonical: 'https://hirememaroc.online/blog',
  });

  const categories = Array.from(new Set(BLOG_POSTS.map(p => p.category)));

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-8 sm:py-12">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs text-indigo-600 font-bold mb-3 uppercase tracking-wider">
          <i className="fa fa-newspaper"></i>
          <span>Blog & Ressources</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
          Blog HireMe Maroc
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Conseils, guides et actualités pour vous aider dans votre recherche d'emploi au Maroc.
          Découvrez nos articles pour optimiser votre candidature et réussir votre carrière.
        </p>
      </div>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <span
              key={cat}
              className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg text-xs font-bold"
            >
              {cat}
            </span>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {BLOG_POSTS.map(post => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-indigo-300 hover:shadow-lg transition-all group flex flex-col"
          >
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-6 text-white">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                  {post.category}
                </span>
              </div>
              <h2 className="text-lg font-black leading-snug group-hover:text-white/90 transition-colors line-clamp-2">
                {post.title}
              </h2>
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4 flex-grow">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between text-xs text-slate-400 font-medium pt-3 border-t border-slate-100">
                <span className="flex items-center gap-1.5">
                  <i className="fa fa-calendar text-[10px]"></i>
                  {new Date(post.date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="fa fa-clock text-[10px]"></i>
                  {post.readTime}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <section className="mt-12 bg-gradient-to-br from-indigo-500 to-indigo-700 text-white p-8 sm:p-10 rounded-2xl text-center">
        <h2 className="text-xl sm:text-2xl font-black mb-3">
          Trouvez votre prochain emploi
        </h2>
        <p className="text-sm text-white/80 mb-6 max-w-lg mx-auto">
          Explorez des centaines d'offres d'emploi à travers tout le Maroc.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-white text-indigo-700 px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/90 transition-all hover:shadow-lg"
        >
          <i className="fa fa-briefcase text-xs"></i>
          Voir les Offres
        </Link>
      </section>
    </div>
  );
};

export default BlogIndex;
