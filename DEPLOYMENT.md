# EastCulture 部署与配置文档

## 项目结构

```
EastCulture/
├── frontend/   # Vite + React SPA → 部署到 Vercel (eastculture.vercel.app)
├── api/        # Next.js API Routes → 部署到 Vercel (新项目)
└── backend/    # 旧 Express 后端（已弃用，可删除）
```

---

## 第一步：Supabase 数据库设置

1. 访问 https://supabase.com，新建免费项目
2. 项目名称：`eastculture`，数据库密码记好
3. 进入 **SQL Editor**，把 `api/supabase/schema.sql` 的内容全部粘贴运行
4. 进入 **Settings → API**，复制以下值：
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `service_role` (secret key) → `SUPABASE_SERVICE_ROLE_KEY`

---

## 第二步：Stripe 支付设置

1. 注册 https://stripe.com（选择美国 USD）
2. 进入 Dashboard → **Developers → API Keys**：
   - 复制 `Secret key` → `STRIPE_SECRET_KEY`
3. 进入 **Webhooks → Add endpoint**：
   - URL：`https://eastculture-api.vercel.app/api/webhook/stripe`
   - 监听事件：
     - `checkout.session.completed`
     - `invoice.paid`
     - `customer.subscription.deleted`
   - 复制 `Signing secret` → `STRIPE_WEBHOOK_SECRET`

---

## 第三步：部署 API 项目到 Vercel

```bash
# 进入 api 目录
cd api

# 安装 Vercel CLI（如果还没有）
npm i -g vercel

# 部署
vercel

# 按提示操作：
# - Link to existing project? No
# - Project name: eastculture-api
# - Which directory? ./
```

### 在 Vercel 上设置环境变量

进入 Vercel Dashboard → eastculture-api → Settings → Environment Variables，添加：

| 变量名 | 值 |
|--------|-----|
| `NEXT_PUBLIC_SUPABASE_URL` | https://xxxx.supabase.co |
| `SUPABASE_SERVICE_ROLE_KEY` | eyJhbGci... |
| `JWT_SECRET` | 随机32位字符串（`openssl rand -base64 32`） |
| `STRIPE_SECRET_KEY` | sk_live_... 或 sk_test_... |
| `STRIPE_WEBHOOK_SECRET` | whsec_... |
| `AWS_REGION` | ap-southeast-2 |
| `S3_BUCKET_NAME` | eastculture-video-nz |
| `AWS_ACCESS_KEY_ID` | AKIA... |
| `AWS_SECRET_ACCESS_KEY` | ... |
| `NEXT_PUBLIC_FRONTEND_URL` | https://eastculture.vercel.app |
| `ADMIN_SECRET_KEY` | 自定义管理员密钥（记住这个，用于登录后台） |

---

## 第四步：更新前端环境变量并重新部署

### 在 Vercel 的前端项目（eastculture）设置环境变量：

| 变量名 | 值 |
|--------|-----|
| `VITE_API_BASE` | https://eastculture-api.vercel.app |

然后重新部署前端：

```bash
cd frontend
vercel --prod
```

或者在 Vercel Dashboard 手动触发 Redeploy。

---

## 第五步：测试流程

### 测试注册/登录

1. 访问 https://eastculture.vercel.app
2. 点击 Login → Create Account
3. 填写用户名、邮箱、密码注册
4. 检查 Supabase → Table Editor → users 表是否有记录

### 测试支付（先用测试模式）

Stripe 测试卡号：`4242 4242 4242 4242`，任意有效期和 CVV

1. 登录后点击课程页面的"购买"按钮
2. 跳转到 Stripe Checkout 页面
3. 输入测试卡号完成支付
4. 自动跳回网站，课程应已解锁
5. 检查 Supabase → orders 表（status = paid）和 user_purchases 表（status = active）

### 测试管理后台

访问 `https://eastculture-api.vercel.app/admin`

- 输入你设置的 `ADMIN_SECRET_KEY`
- 可以看到用户列表和订单列表

---

## 价格说明

- 单个视频：$10 USD
- Face Yoga 完整课程：$149 USD
- 太极系统课：$30 USD
- Qigong/穴位课：$99 USD
- 会员（月付）：$29 USD/月（英文版显示 $29/month）

---

## 管理后台

**入口**：https://eastculture-api.vercel.app/admin

- 需要 Admin Secret Key（你在 Vercel 环境变量中设置的 `ADMIN_SECRET_KEY`）
- 查看所有注册用户
- 查看所有订单（包括支付状态、金额、时间）
- 总收入统计

---

## 收款账户信息

TTT CONSTRUCTION LTD
06-0313-0722792-00

（此信息目前未显示在前台页面，如需添加银行转账说明页，可在 ContactPage 或 About 页添加）

---

## 切换到正式支付

1. 在 Stripe Dashboard 切换到 Live Mode
2. 把 Vercel 环境变量 `STRIPE_SECRET_KEY` 改为 `sk_live_...`
3. 重新注册一个正式的 Webhook（Live Mode），更新 `STRIPE_WEBHOOK_SECRET`
4. Redeploy API 项目

---

## 已改动的文件清单

### 新增文件（api/ 目录）

| 文件 | 说明 |
|------|------|
| `api/` | 全新 Next.js 项目（替换旧 Express backend） |
| `api/lib/supabase.ts` | Supabase 客户端（懒加载） |
| `api/lib/stripe.ts` | Stripe 客户端（懒加载） |
| `api/lib/auth.ts` | JWT 签发/验证、权限检查 |
| `api/lib/database.types.ts` | TypeScript 数据库类型定义 |
| `api/app/api/auth/register/route.ts` | 注册接口 |
| `api/app/api/auth/login/route.ts` | 登录接口 |
| `api/app/api/auth/me/route.ts` | 获取当前用户 + 购买记录 |
| `api/app/api/auth/logout/route.ts` | 退出登录（清除 cookie） |
| `api/app/api/checkout/route.ts` | Stripe 支付创建接口 |
| `api/app/api/webhook/stripe/route.ts` | Stripe Webhook（支付成功后解锁权限） |
| `api/app/api/video-url/route.ts` | S3 视频签名 URL（带鉴权） |
| `api/app/api/purchases/route.ts` | 查询用户已购内容 |
| `api/app/api/admin/users/route.ts` | 管理后台：用户列表 |
| `api/app/api/admin/orders/route.ts` | 管理后台：订单列表 |
| `api/app/admin/page.tsx` | 管理后台 UI 页面 |
| `api/app/payment/success/page.tsx` | 支付成功跳转页 |
| `api/app/payment/cancel/page.tsx` | 支付取消跳转页 |
| `api/supabase/schema.sql` | Supabase 数据库建表 SQL |
| `api/.env.example` | 环境变量示例 |
| `api/vercel.json` | Vercel 部署配置 |

### 修改文件（frontend/ 目录）

| 文件 | 修改内容 |
|------|----------|
| `frontend/src/App.jsx` | 添加 API 连接、session 恢复、支付入口、真实退出登录 |
| `frontend/src/pages/LoginPage.jsx` | 改为调用真实 API 登录（移除 localStorage） |
| `frontend/src/pages/RegisterPage.jsx` | 改为调用真实 API 注册（移除 localStorage） |
| `frontend/src/pages/FaceYogaPage.jsx` | 接入真实购买流程，移除 demo 调试按钮 |
| `frontend/src/pages/QimenPage.jsx` | 接入真实购买流程，移除 demo 调试按钮 |
| `frontend/src/pages/QigongPage.jsx` | 接入真实购买流程，移除 demo 调试按钮 |
| `frontend/src/pages/ContactPage.jsx` | 联系邮箱改为 jzc1998926@gmail.com |
| `frontend/.env.example` | 新增前端环境变量示例 |
