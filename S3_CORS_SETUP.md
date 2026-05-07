# 修复 S3 视频 CORS 问题

## 问题原因

浏览器直接从 S3 presigned URL 播放视频时，S3 bucket 必须配置 CORS 允许你的域名访问。

当前错误：
```
Access to video at 'https://eastculture-video-nz.s3.ap-southeast-2.amazonaws.com/...' 
from origin 'https://www.wellnesseastern.com' has been blocked by CORS policy: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## 解决方案

### 方法 1：通过 AWS 控制台配置（推荐）

1. 登录 AWS Console：https://console.aws.amazon.com/s3/
2. 找到 bucket：`eastculture-video-nz`
3. 点击 **Permissions** 标签
4. 滚动到 **Cross-origin resource sharing (CORS)** 部分
5. 点击 **Edit**
6. 粘贴以下配置（或使用项目根目录的 `S3_CORS_CONFIG.json` 文件内容）：

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedOrigins": [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://eastculture.vercel.app",
      "https://wellnesseastern.com",
      "https://www.wellnesseastern.com"
    ],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]
```

7. 点击 **Save changes**

### 方法 2：通过 AWS CLI 配置

如果你已经安装了 AWS CLI 并配置了凭证：

```bash
# 使用项目根目录的配置文件
aws s3api put-bucket-cors \
  --bucket eastculture-video-nz \
  --cors-configuration file://S3_CORS_CONFIG.json

# 验证配置
aws s3api get-bucket-cors --bucket eastculture-video-nz
```

## 配置说明

- **AllowedOrigins**：允许访问的域名列表
  - `http://localhost:5173` - 本地开发
  - `https://eastculture.vercel.app` - 旧域名（向后兼容）
  - `https://wellnesseastern.com` - 新域名（无 www）
  - `https://www.wellnesseastern.com` - 新域名（带 www）

- **AllowedMethods**：允许的 HTTP 方法
  - `GET` - 获取视频文件
  - `HEAD` - 检查文件是否存在（浏览器可能会先发送 HEAD 请求）

- **AllowedHeaders**：允许的请求头（`*` 表示全部）

- **ExposeHeaders**：暴露给浏览器的响应头
  - `ETag` - 用于缓存验证

- **MaxAgeSeconds**：浏览器缓存 CORS 预检请求结果的时间（3000秒 = 50分钟）

## 测试

配置完成后：

1. 清除浏览器缓存（或使用无痕模式）
2. 重新访问 https://www.wellnesseastern.com
3. 登录测试账号
4. 尝试播放任意视频
5. 检查浏览器控制台，CORS 错误应该消失

## 注意事项

- CORS 配置立即生效，无需等待
- 如果添加新域名，需要更新此配置
- 生产环境建议只保留实际使用的域名，移除 localhost
