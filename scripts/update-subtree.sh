#!/bin/bash

# Git Subtree 업데이트 스크립트
# obsidian-note 저장소의 최신 변경사항을 가져옴

echo "🔄 Git Subtree 업데이트 시작..."

# obsidian-note 저장소에서 최신 변경사항 가져오기
git subtree pull --prefix=content https://github.com/yeongin-ji/obsidian-note.git main --squash

echo "✅ Git Subtree 업데이트 완료!"
echo ""
echo "📝 변경사항을 커밋하려면:"
echo "  git add ."
echo "  git commit -m 'Update obsidian content'"
echo "  git push" 