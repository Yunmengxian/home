# 無名の主页

> 简洁优雅的个人主页，基于 Vue 3 + Vite 构建。

## 技术栈

- Vue 3 + Vite
- Pinia（状态管理）
- Element Plus（UI 组件）
- SCSS（样式）
- PWA（离线支持）

## 功能

- 🎨 可切换壁纸（默认 / 每日一图 / 随机风景 / 随机动漫）
- ⏰ 实时时钟 & 时光胶囊
- 📝 一言（Hitokoto）
- 🌤 天气（腾讯 / 高德 / 备用 API 自动降级）
- 🔗 社交链接 & 站点导航

## 快速开始

```bash
# 复制环境变量模板并修改
cp .env.example .env

# 安装依赖
pnpm install

# 本地预览
pnpm dev

# 构建
pnpm build
```

构建产物在 `dist/` 目录，可部署到任意静态服务器。

## 配置

| 文件 | 说明 |
|---|---|
| `.env` | 站点名称、天气 Key、建站日期等 |
| `src/assets/siteLinks.json` | 网站链接列表 |
| `src/assets/socialLinks.json` | 社交链接 |
| `public/images/` | 壁纸和图标 |

### 天气 API

支持三种天气源自动降级：腾讯位置服务 → 高德开放平台 → 教书先生 API。

在 `.env` 中配置：

```bash
VITE_TX_WEATHER_KEY = ""  # 腾讯位置服务 Key
VITE_GD_WEATHER_KEY = ""  # 高德开放平台 Key
```

若均留空则使用免费备用 API。

### 壁纸

在 `public/images/` 放入 `background1.jpg` ~ `background10.jpg`（可增减），通过设置面板切换。

## 自动部署

Push `master` 或 `dev` 分支即可触发 GitHub Actions 自动构建，产物下载见 Actions → Artifacts。

## Changelog

### v5.0.0

**移除**
- 音乐播放器（Music.vue / Player.vue）及相关依赖 aplayer、@worstone/vue-aplayer
- 冗余依赖：axios、terser、fetch-jsonp
- 无效 API：getTXAdcodeS / getTXWeatherS / getXMWeather / getPlayerList
- 废弃的 IE 跳转脚本

**修复**
- `gwg is not defined` 崩溃
- Weather.vue 引用不存在模块
- PWA CacheFirst → StaleWhileRevalidate
- 事件监听器泄漏（App.vue / Music.vue）

**优化**
- 天气代码重构，消除重复
- 时光胶囊减少冗余重算
- 壁纸随机化修复
- 手写 debounce → lodash-es
- shared util 抽取
- Workflow 迁移 pnpm + Node 24

**清理**
- 删除 11 个无用文件（lint 配置、CODE_OF_CONDUCT、ISSUE_TEMPLATE、screenshots、Dockerfile 等）
- 恢复上游 `.env.example` 模板

## License

MIT
