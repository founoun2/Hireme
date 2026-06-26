import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSEO } from '../../hooks/useSEO';
import { BLOG_POSTS } from '../../seo/seoData';

const BlogPost: React.FC = () => {
  const { postSlug } = useParams<{ postSlug: string }>();

  const post = useMemo(() => {
    return BLOG_POSTS.find(p => p.slug === postSlug);
  }, [postSlug]);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return BLOG_POSTS
      .filter(p => p.slug !== postSlug && p.category === post.category)
      .slice(0, 3);
  }, [postSlug, post]);

  const morePosts = useMemo(() => {
    if (relatedPosts.length >= 3) return [];
    return BLOG_POSTS
      .filter(p => p.slug !== postSlug && p.category !== post?.category)
      .slice(0, 3 - relatedPosts.length);
  }, [postSlug, relatedPosts, post]);

  const allRelated = [...relatedPosts, ...morePosts];

  useSEO({
    title: post?.title || 'Article de Blog',
    description: post?.excerpt || 'Lisez cet article sur le marché du travail au Maroc.',
    canonical: `https://hirememaroc.online/blog/${postSlug}`,
  });

  if (!post) {
    return (
      <div className="max-w-5xl mx-auto px-3 sm:px-6 py-8 sm:py-12">
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-6 text-slate-300">
            <i className="fa fa-file-circle-question text-3xl"></i>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-3">Article Introuvable</h1>
          <p className="text-sm text-slate-500 mb-6">L'article que vous recherchez n'existe pas ou a été déplacé.</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all"
          >
            <i className="fa fa-arrow-left text-xs"></i>
            Retour au Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-8 sm:py-12">
      <div className="mb-6">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <i className="fa fa-arrow-left text-xs"></i>
          Retour au Blog
        </Link>
      </div>

      <article>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg text-xs font-bold">
              {post.category}
            </span>
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <i className="fa fa-calendar text-[10px]"></i>
              {new Date(post.date).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <i className="fa fa-clock text-[10px]"></i>
              {post.readTime}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            {post.title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-500 leading-relaxed font-medium">
            {post.excerpt}
          </p>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-8"></div>

        <div
          className="prose prose-slate max-w-none
            prose-headings:font-black prose-headings:text-slate-900
            prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-sm prose-p:text-slate-600 prose-p:leading-relaxed
            prose-li:text-sm prose-li:text-slate-600
            prose-strong:text-slate-900"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-10"></div>

      {allRelated.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-black text-slate-900 mb-5">
            <i className="fa fa-newspaper text-indigo-500 mr-2"></i>
            Articles Similaires
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {allRelated.map(related => (
              <Link
                key={related.slug}
                to={`/blog/${related.slug}`}
                className="bg-white border border-slate-200 p-5 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-[10px] font-bold">
                    {related.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">{related.readTime}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 mb-2">
                  {related.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {related.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mt-10 text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all hover:shadow-lg"
        >
          <i className="fa fa-briefcase text-xs"></i>
          Voir les Offres d'Emploi
        </Link>
      </section>
    </div>
  );
};

export default BlogPost;
