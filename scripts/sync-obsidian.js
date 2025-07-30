#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const OBSIDIAN_REPO = 'obsidian-note';
const CONTENT_DIR = path.join(process.cwd(), 'content');
const TEMP_DIR = path.join(process.cwd(), 'temp-obsidian');

// GitHub 사용자명을 환경 변수에서 가져오거나 기본값 사용
const GITHUB_USERNAME = process.env.GIT_USERNAME || 'yeongin-ji';

async function syncObsidianContent() {
  try {
    console.log('🔄 옵시디언 볼트 동기화 시작...');
    
    // 임시 디렉토리 생성
    if (!fs.existsSync(TEMP_DIR)) {
      fs.mkdirSync(TEMP_DIR, { recursive: true });
    }
    
    // obsidian-note 저장소 클론 또는 업데이트
    const repoUrl = `https://github.com/${GITHUB_USERNAME}/${OBSIDIAN_REPO}.git`;
    
    if (!fs.existsSync(path.join(TEMP_DIR, '.git'))) {
      console.log('📥 obsidian-note 저장소 클론 중...');
      execSync(`git clone ${repoUrl} ${TEMP_DIR}`, { stdio: 'inherit' });
    } else {
      console.log('🔄 obsidian-note 저장소 업데이트 중...');
      execSync(`cd ${TEMP_DIR} && git pull origin main`, { stdio: 'inherit' });
    }
    
    // content 디렉토리 정리
    if (fs.existsSync(CONTENT_DIR)) {
      fs.rmSync(CONTENT_DIR, { recursive: true, force: true });
    }
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
    
    // 마크다운 파일 복사
    console.log('📁 마크다운 파일 복사 중...');
    const copiedFiles = copyMarkdownFiles(TEMP_DIR, CONTENT_DIR);
    
    console.log(`✅ ${copiedFiles.length}개의 마크다운 파일이 복사되었습니다.`);
    
    // 임시 디렉토리 정리
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });
    
    console.log('✅ 옵시디언 볼트 동기화 완료!');
    
  } catch (error) {
    console.error('❌ 동기화 중 오류 발생:', error.message);
    
    // 임시 디렉토리 정리
    if (fs.existsSync(TEMP_DIR)) {
      fs.rmSync(TEMP_DIR, { recursive: true, force: true });
    }
    
    process.exit(1);
  }
}

function copyMarkdownFiles(sourceDir, targetDir) {
  const copiedFiles = [];
  
  function copyRecursive(currentSourceDir, currentTargetDir) {
    if (!fs.existsSync(currentSourceDir)) {
      return;
    }
    
    const files = fs.readdirSync(currentSourceDir);
    
    files.forEach(file => {
      const sourcePath = path.join(currentSourceDir, file);
      const targetPath = path.join(currentTargetDir, file);
      const stat = fs.statSync(sourcePath);
      
      if (stat.isDirectory()) {
        // .git, node_modules 등은 제외
        if (file !== '.git' && file !== 'node_modules' && !file.startsWith('.')) {
          if (!fs.existsSync(targetPath)) {
            fs.mkdirSync(targetPath, { recursive: true });
          }
          copyRecursive(sourcePath, targetPath);
        }
      } else if (file.endsWith('.md')) {
        // 마크다운 파일만 복사
        fs.copyFileSync(sourcePath, targetPath);
        copiedFiles.push(file);
        console.log(`  📄 ${file} 복사됨`);
      }
    });
  }
  
  copyRecursive(sourceDir, targetDir);
  return copiedFiles;
}

// 스크립트 실행
if (require.main === module) {
  // GitHub 사용자명 확인
  if (GITHUB_USERNAME === 'YOUR_USERNAME') {
    console.error('❌ GitHub 사용자명을 설정해주세요.');
    console.error('환경 변수 GITHUB_USERNAME을 설정하거나 스크립트를 수정하세요.');
    process.exit(1);
  }
  
  syncObsidianContent();
}

module.exports = { syncObsidianContent }; 