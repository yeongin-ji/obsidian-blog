import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import toc from 'remark-toc';

export interface PostData {
  id: string;
  title: string;
  date: string;
  tags: string[];
  content: string;
  excerpt: string;
  slug: string;
}

export interface PostMeta {
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
}

const postsDirectory = path.join(process.cwd(), 'content');

// URL 안전한 slug 생성 함수
function createSafeSlug(filePath: string): string {
  // 파일 경로에서 content/ 제거하고 .md 확장자 제거
  const relativePath = path.relative(postsDirectory, filePath);
  const withoutExt = relativePath.replace(/\.md$/, '');
  
  // URL 안전한 문자열로 변환
  return withoutExt
    .replace(/[^\w\s-]/g, '') // 특수문자 제거
    .replace(/\s+/g, '-') // 공백을 하이픈으로
    .replace(/-+/g, '-') // 연속된 하이픈을 하나로
    .toLowerCase()
    .trim();
}

// 재귀적으로 모든 마크다운 파일 경로를 수집
function getAllMarkdownFiles(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file.startsWith('.')) continue; // 숨김파일 무시
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(getAllMarkdownFiles(filePath));
    } else if (file.endsWith('.md')) {
      results.push(filePath);
    }
    // .canvas, .excalidraw 등 기타 확장자는 무시
  }
  return results;
}

export function getAllPostIds() {
  const mdFiles = getAllMarkdownFiles(postsDirectory);
  return mdFiles.map((fullPath) => {
    const slug = createSafeSlug(fullPath);
    return {
      params: {
        id: slug,
      },
    };
  });
}

export function getPostData(id: string): PostData {
  // id는 URL 안전한 slug이므로, 원본 파일을 찾아야 함
  const mdFiles = getAllMarkdownFiles(postsDirectory);
  const targetFile = mdFiles.find(file => createSafeSlug(file) === id);
  
  if (!targetFile) {
    throw new Error(`Post not found: ${id}`);
  }
  
  const fileContents = fs.readFileSync(targetFile, 'utf8');
  const matterResult = matter(fileContents);
  const processedContent = remark()
    .use(gfm)
    .use(toc, { heading: '목차' })
    .use(html)
    .processSync(matterResult.content);

  const contentHtml = processedContent.toString();
  const processedContentHtml = processObsidianLinks(contentHtml);

  return {
    id,
    content: processedContentHtml,
    ...(matterResult.data as PostMeta),
    slug: id,
  };
}

export function getAllPosts(): PostData[] {
  const mdFiles = getAllMarkdownFiles(postsDirectory);
  const allPostsData = mdFiles.map((fullPath) => {
    const slug = createSafeSlug(fullPath);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const processedContent = remark()
      .use(gfm)
      .use(toc, { heading: '목차' })
      .use(html)
      .processSync(matterResult.content);
    const contentHtml = processedContent.toString();
    const processedContentHtml = processObsidianLinks(contentHtml);
    return {
      id: slug,
      content: processedContentHtml,
      ...(matterResult.data as PostMeta),
      slug: slug,
    };
  });
  
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Obsidian 내부 링크 처리 함수
function processObsidianLinks(content: string): string {
  // [[파일명]] 형태의 링크를 처리
  return content.replace(/\[\[([^\]]+)\]\]/g, (match, linkText) => {
    const [fileName, displayText] = linkText.split('|');
    // 파일명을 안전한 slug로 변환
    const slug = createSafeSlug(fileName + '.md');
    const display = displayText || fileName;
    return `<a href="/posts/${slug}" class="internal-link">${display}</a>`;
  });
}

// 태그별 포스트 필터링
export function getPostsByTag(tag: string): PostData[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.tags && post.tags.includes(tag));
}

// 모든 태그 가져오기
export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const tags = new Set<string>();
  allPosts.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => tags.add(tag));
    }
  });
  return Array.from(tags).sort();
} 