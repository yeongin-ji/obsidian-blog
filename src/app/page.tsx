import Link from 'next/link';
import { getAllPosts, getAllTags } from '@/lib/markdown';

export default function Home() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            📝 옵시디언 블로그
          </h1>
          <p className="text-gray-600 mt-2">
            옵시디언 볼트를 웹사이트로 변환한 지식 공유 공간입니다.
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <main className="lg:col-span-3">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              최근 포스트
            </h2>
            
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
                      {post.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/tags/${tag}`}
                          className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full hover:bg-blue-200 transition-colors"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                태그
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${tag}`}
                    className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
