import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SpotlightTiltCard } from '../components/SpotlightTiltCard';
import type { Locale } from '../data/translations';

interface BlogPageProps {
  currentLocale: Locale;
}

export const BlogPage: React.FC<BlogPageProps> = ({ currentLocale }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/blog.json')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="_page_9tqhr_3">
      {/* Header */}
      <section className="_pageHead_9tqhr_7">
        <div className="container">
          <span className="monoLabel">// ARTICLES & INSIGHTS</span>
          <h1 className="_title_9tqhr_11">Blog</h1>
          <p style={{ color: 'var(--text-dim)', maxWidth: '60ch', marginTop: '0.8rem' }}>
            iOS dasturlash, App Store review jarayonlari, mahsulot arxitekturasi va AI muhandisligi haqida maqolalar.
          </p>
        </div>
      </section>

      {/* List */}
      <section className="_section_9tqhr_20">
        <div className="container">
          {loading ? (
            <div className="_empty_9tqhr_30">Maqolalar yuklanmoqda...</div>
          ) : posts.length === 0 ? (
            <div className="_empty_9tqhr_30">Hozircha maqolalar mavjud emas.</div>
          ) : (
            <div className="_postList_9tqhr_45">
              {posts.map((post, idx) => (
                <SpotlightTiltCard key={post.slug} delay={idx * 80}>
                  <NavLink
                    to={`/${currentLocale}/blog/${post.slug}`}
                    className="_postCard_9tqhr_51"
                    style={{ textDecoration: 'none', display: 'flex', height: '100%' }}
                  >
                    <div className="_postMeta_9tqhr_59">
                      <time className="_postDate_9tqhr_66">{post.date}</time>
                      {post.tags && (
                        <div className="_tagRow_9tqhr_72">
                          {post.tags.map((tag: string, i: number) => (
                            <span key={i} className="chip">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <h2 className="_postTitle_9tqhr_78">{post.title}</h2>
                    <p className="_postDesc_9tqhr_85">{post.description || post.summary}</p>

                    <div className="_postLink_9tqhr_92">
                      <span>Maqolani o'qish</span>
                      <ArrowRight size={14} />
                    </div>
                  </NavLink>
                </SpotlightTiltCard>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
