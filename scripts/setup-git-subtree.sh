#!/bin/bash

# Git Subtree 설정 스크립트 (대안 방법)
# obsidian-note 저장소를 obsidian-blog의 하위 디렉토리로 포함

echo "🔧 Git Subtree 설정 시작..."

# obsidian-note 저장소를 subtree로 추가
git subtree add --prefix=content https://github.com/yeongin-ji/obsidian-note.git main --squash

echo "✅ Git Subtree 설정 완료!"
echo ""
echo "📝 다음 명령어로 subtree를 업데이트할 수 있습니다:"
echo "  git subtree pull --prefix=content https://github.com/yeongin-ji/obsidian-note.git main --squash"
echo ""
echo "📝 또는 스크립트 사용:"
echo "  ./scripts/update-subtree.sh" 