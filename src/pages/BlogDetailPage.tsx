import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import type { Locale } from '../data/translations';

interface BlogDetailPageProps {
  currentLocale: Locale;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ currentLocale }) => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch(`/data/blog/${encodeURIComponent(slug)}.json`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="_page_9tqhr_3">
        <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
          <p className="_empty_9tqhr_30">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="_page_9tqhr_3">
        <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
          <p className="_empty_9tqhr_30">Maqola topilmadi.</p>
          <NavLink to={`/${currentLocale}/blog`} className="btn btnGhost" style={{ marginTop: '1.5rem' }}>
            ← Blogga qaytish
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="_page_9tqhr_3">
      <div className="container _detail_9tqhr_26">
        <article className="_article_9tqhr_119">
          <NavLink to={`/${currentLocale}/blog`} className="_backLink_9tqhr_104">
            ← Barcha maqolalar
          </NavLink>

          <header className="_articleHead_9tqhr_125">
            <div className="_articleMeta_9tqhr_131">
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
            <h1 className="_articleTitle_9tqhr_139">{post.title}</h1>
          </header>

          <div className="_prose_9tqhr_149" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>
            {post.content || post.description || post.body}
          </div>
        </article>
      </div>
    </div>
  );
};
