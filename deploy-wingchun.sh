#!/bin/bash
# 咏春功能部署脚本 - 双击或在终端运行

set -e  # 遇到错误就停止

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
echo "📁 项目目录: $REPO_DIR"
echo ""

# 清理可能存在的 git 锁文件
if [ -f "$REPO_DIR/.git/index.lock" ]; then
  echo "🔧 清理 git 锁文件..."
  rm -f "$REPO_DIR/.git/index.lock"
fi

cd "$REPO_DIR"

echo "📦 添加修改的文件..."
git add frontend/src/App.jsx
git add frontend/src/pages/WingChunPage.jsx
git add frontend/src/pages/MyCoursesPage.jsx
git add api/app/api/checkout/route.ts
git add api/app/api/video-url/route.ts
git add frontend/public/images/wing-chun-yangsheng-cover.jpg
git add frontend/public/images/wing-chun-fangwei-cover.png

echo ""
echo "✅ 已暂存的文件："
git diff --cached --name-only

echo ""
echo "💾 提交代码..."
git commit -m "feat: add wingchun course with S3 video unlock and purchase flow"

echo ""
echo "🚀 推送到 GitHub (Vercel 会自动部署)..."
git push

echo ""
echo "✅ 完成！Vercel 将在 2~3 分钟内自动部署。"
echo "   前端: https://eastculture.vercel.app"
echo "   后端: https://eastculture-api.vercel.app"
echo ""
read -p "按任意键关闭..."
