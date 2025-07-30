# 📝 옵시디언 블로그

옵시디언 볼트를 자동으로 웹사이트로 변환하는 Next.js 기반 블로그입니다.

## ✨ 주요 기능

- **마크다운 지원**: 옵시디언에서 작성한 마크다운 파일을 그대로 사용
- **내부 링크**: `[[파일명]]` 형태의 옵시디언 내부 링크 지원
- **태그 시스템**: 포스트 분류 및 필터링
- **자동 배포**: GitHub Actions를 통한 자동 빌드 및 배포
- **반응형 디자인**: 모바일과 데스크톱에서 모두 최적화된 UI

## 🚀 시작하기

### 1. 저장소 설정

1. 이 저장소를 포크하거나 클론합니다
2. `obsidian-note`라는 이름의 별도 GitHub 저장소를 생성합니다
3. 옵시디언에서 해당 저장소를 Git 플러그인으로 연결합니다

### 2. 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 3. Vercel 배포 설정

1. [Vercel](https://vercel.com)에 가입하고 새 프로젝트를 생성합니다
2. GitHub 저장소를 연결합니다
3. 환경 변수를 설정합니다:
   - `VERCEL_TOKEN`: Vercel API 토큰
   - `VERCEL_ORG_ID`: Vercel 조직 ID
   - `VERCEL_PROJECT_ID`: Vercel 프로젝트 ID

### 4. GitHub Secrets 설정

GitHub 저장소의 Settings > Secrets and variables > Actions에서 다음 시크릿을 추가합니다:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## 📁 프로젝트 구조

```
obsidian-blog/
├── content/           # 마크다운 파일들이 저장되는 디렉토리
├── src/
│   ├── app/          # Next.js App Router
│   ├── lib/          # 유틸리티 함수들
│   └── components/   # React 컴포넌트들
├── scripts/          # 동기화 스크립트
├── .github/workflows/ # GitHub Actions
└── public/           # 정적 파일들
```

## 🔄 자동화 워크플로우

1. **옵시디언에서 작성**: 옵시디언에서 마크다운 파일을 작성합니다
2. **Git 커밋**: 변경사항을 커밋하고 `obsidian-note` 저장소에 푸시합니다
3. **자동 동기화**: GitHub Actions가 자동으로 submodule을 업데이트합니다
4. **자동 배포**: Vercel에 자동으로 배포됩니다

### 저장소 포함 방법

#### 방법 1: Git Submodule (권장)

```bash
# obsidian-note 저장소를 submodule로 추가
./scripts/setup-submodule.sh

# 또는 수동으로 설정
git submodule add https://github.com/YOUR_USERNAME/obsidian-note.git content

# submodule 업데이트
npm run update-content
```

#### 방법 2: Git Subtree (대안)

```bash
# obsidian-note 저장소를 subtree로 추가
./scripts/setup-git-subtree.sh

# 또는 수동으로 설정
git subtree add --prefix=content https://github.com/YOUR_USERNAME/obsidian-note.git main --squash

# subtree 업데이트
./scripts/update-subtree.sh
```

## 📝 마크다운 파일 형식

각 마크다운 파일은 다음과 같은 frontmatter를 포함해야 합니다:

```markdown
---
title: '포스트 제목'
date: '2024-01-15'
tags: ['태그1', '태그2']
excerpt: '포스트 요약'
---

# 포스트 내용

여기에 마크다운 내용을 작성합니다.
```

## 🔗 옵시디언 내부 링크

옵시디언의 내부 링크를 지원합니다:

- `[[파일명]]`: 다른 마크다운 파일로 링크
- `[[파일명|표시텍스트]]`: 표시 텍스트가 있는 링크

## 🛠️ 개발

### 로컬 개발

```bash
# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

### 옵시디언 동기화

```bash
# obsidian-note 저장소에서 마크다운 파일 동기화
npm run update-content
```

## 🎨 커스터마이징

### 스타일 수정

- `tailwind.config.ts`: Tailwind CSS 설정
- `src/app/globals.css`: 전역 스타일

### 레이아웃 수정

- `src/app/page.tsx`: 홈페이지
- `src/app/posts/[slug]/page.tsx`: 포스트 페이지
- `src/app/tags/[tag]/page.tsx`: 태그 페이지

## 📚 사용된 기술

- **Next.js 15**: React 프레임워크
- **TypeScript**: 타입 안전성
- **Tailwind CSS**: 스타일링
- **Remark**: 마크다운 파싱
- **GitHub Actions**: CI/CD
- **Vercel**: 배포 플랫폼

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 새로운 기능 브랜치를 생성합니다
3. 변경사항을 커밋합니다
4. Pull Request를 생성합니다

## 📄 라이선스

MIT License

---

**참고**: 이 프로젝트는 옵시디언의 Git 플러그인과 함께 사용하도록 설계되었습니다.
