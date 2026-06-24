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

## 部署

本项目通过 GitHub Actions 自动构建，推送 `master` 或 `dev` 分支即可触发。

## v5.0.0 Changelog

### 移除
- **音乐播放器模块**：删除 Music.vue、Player.vue 及相关依赖（aplayer、@worstone/vue-aplayer）
- 冗余依赖：axios、terser、fetch-jsonp
- 无效 API：getTXAdcodeS、getTXWeatherS、getXMWeather、getPlayerList
- 失效的 IE 跳转脚本

### 修复
- `gwg is not defined` 崩溃（authServer.js 不存在）
- Weather.vue 引用不存在的 `@/utils/speech` 模块
- PWA CacheFirst → StaleWhileRevalidate（解决部署不更新）
- setPlayerState 语义反了（现在传 true=播放，false=暂停）
- 事件监听器泄漏（App.vue contextmenu/mousedown、Music.vue keydown）

### 优化
- 天气代码重构：220 行 → 110 行，消除 8 处重复
- 时光胶囊周/月/年从每秒重算改为每分钟重算
- 默认壁纸每次切回重新随机
- 手写 debounce.js → lodash-es debounce
- siteUrl 解析抽取为共享 util
- cursor.js 删除无用的 pt 数组遍历
- GitHub Actions workflow 改用 pnpm + ubuntu-latest + Node 20

## License

MIT
