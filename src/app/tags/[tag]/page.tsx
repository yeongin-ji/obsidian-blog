import { getPostsByTag, getAllTags } from '@/lib/markdown';
import Link from 'next/link';

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag: tag,
  }));
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 transition-colors mb-4 inline-block"
          >
            ← 홈으로 돌아가기
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            📝 옵시디언 블로그
          </h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            태그: #{tag}
          </h2>
          <p className="text-gray-600">
            {posts.length}개의 포스트가 있습니다.
          </p>
        </div>
        
        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                <Link
                  href={`/posts/${post.slug}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {post.title}
                </Link>
              </h3>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tagItem) => (
                    <Link
                      key={tagItem}
                      href={`/tags/${tagItem}`}
                      className={`inline-block text-xs px-2 py-1 rounded-full transition-colors ${
                        tagItem === tag
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                      }`}
                    >
                      #{tagItem}
                    </Link>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
} 