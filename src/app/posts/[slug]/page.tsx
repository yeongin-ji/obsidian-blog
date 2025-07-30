import { getPostData, getAllPostIds } from '@/lib/markdown';
import Link from 'next/link';

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths;
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostData(slug);

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
        <article className="bg-white rounded-lg shadow-sm border p-8">
          {/* Post Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${tag}`}
                    className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
            
            {post.excerpt && (
              <p className="text-xl text-gray-600 italic">
                {post.excerpt}
              </p>
            )}
          </header>

          {/* Post Content */}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  );
} 