#!/bin/bash

# Git Submodule 설정 스크립트
# obsidian-note 저장소를 obsidian-blog의 하위 모듈로 추가

echo "🔧 Git Submodule 설정 시작..."

# obsidian-note 저장소를 submodule로 추가
git submodule add https://github.com/yeongin-ji/obsidian-note.git content

echo "✅ Git Submodule 설정 완료!"
echo ""
echo "📝 다음 명령어로 submodule을 업데이트할 수 있습니다:"
echo "  git submodule update --remote"
echo ""
echo "📝 다른 개발자가 클론할 때는 다음 명령어를 사용하세요:"
echo "  git clone --recursive https://github.com/yeongin-ji/obsidian-blog.git"
echo "  또는"
echo "  git clone https://github.com/yeongin-ji/obsidian-blog.git"
echo "  cd obsidian-blog"
echo "  git submodule init"
echo "  git submodule update" 