# 检查 S3 视频文件是否存在

## 问题

视频播放时出现 404 错误：
```
eastculture-video-nz.s3.ap-southeast-2.amazonaws.com/9.9/lower-back-pain.mp4
Failed to load resource: the server responded with a status of 404 (Not Found)
```

## 需要检查的文件

根据 `frontend/src/pages/JiuJiuPage.jsx` 的配置，需要确认以下 3 个视频文件是否存在于 S3 bucket：

1. `9.9/lower-back-pain.mp4` - Lesson 1: Lower Back Pain Relief
2. `9.9/neck-shoulder-relief.mp4` - Lesson 2: Neck & Shoulder Relief  
3. `9.9/sleep-calm-support.mp4` - Lesson 3: Sleep & Calm Support

## 检查方法

### 方法 1：通过 AWS Console（推荐）

1. 登录 AWS Console：https://console.aws.amazon.com/s3/
2. 找到 bucket：`eastculture-video-nz`
3. 查看是否有 `9.9/` 文件夹
4. 确认上述 3 个 `.mp4` 文件是否存在

### 方法 2：通过 AWS CLI

如果你已经配置了 AWS CLI：

```bash
# 列出 9.9 文件夹下的所有文件
aws s3 ls s3://eastculture-video-nz/9.9/ --region ap-southeast-2

# 应该看到类似输出：
# 2024-XX-XX XX:XX:XX   XXXXXXX lower-back-pain.mp4
# 2024-XX-XX XX:XX:XX   XXXXXXX neck-shoulder-relief.mp4
# 2024-XX-XX XX:XX:XX   XXXXXXX sleep-calm-support.mp4
```

## 可能的问题

### 问题 1：文件不存在

如果 S3 里没有这些文件，需要：
1. 上传视频文件到 S3 的 `9.9/` 文件夹
2. 确保文件名完全匹配（区分大小写）

### 问题 2：文件名不匹配

如果文件存在但名字不同，有两个选择：
1. 重命名 S3 文件以匹配代码中的名字
2. 修改 `JiuJiuPage.jsx` 中的 `s3Key` 字段以匹配实际文件名

### 问题 3：文件在不同的文件夹

如果视频文件在其他文件夹（比如 `jiujiu/` 或 `quick-relief/`），需要：
1. 移动文件到 `9.9/` 文件夹，或
2. 更新代码中的 `s3Key` 路径

## 上传文件到 S3（如果需要）

### 通过 AWS Console

1. 进入 bucket：`eastculture-video-nz`
2. 创建文件夹：`9.9`
3. 点击 Upload，选择视频文件
4. 确保文件名正确

### 通过 AWS CLI

```bash
# 上传单个文件
aws s3 cp /path/to/lower-back-pain.mp4 \
  s3://eastculture-video-nz/9.9/lower-back-pain.mp4 \
  --region ap-southeast-2

# 批量上传整个文件夹
aws s3 sync /path/to/local/9.9/ \
  s3://eastculture-video-nz/9.9/ \
  --region ap-southeast-2
```

## 验证修复

1. 确认文件已上传到 S3
2. 清除浏览器缓存
3. 重新登录 https://www.wellnesseastern.com
4. 访问 Quick Relief Self-Care Course 页面
5. 尝试播放视频

## 已修复的问题

✅ **My Courses 页面现在会显示 jiujiu 课程** - 已添加到 `MyCoursesPage.jsx`
✅ **S3 CORS 配置** - 已包含 `https://www.wellnesseastern.com`

⚠️ **待确认：S3 视频文件是否存在** - 需要你在 AWS Console 检查
