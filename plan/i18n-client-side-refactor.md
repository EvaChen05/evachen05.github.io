# Plan: 客户端 i18n 重构（消除 /zh/ 路由）

> **目标**：URL 永远保持 `https://evachen05.github.io/`，中英文切换通过
> JavaScript + localStorage 在客户端完成，同时彻底修复 CSS 不注入的 bug。

---

## 问题根源（背景）

当前 `zh/` 页面（`zh/index.astro`、`zh/about.astro`、`zh/projects/[id].astro`）
均采用"将完整 Page 当 Component 嵌套"的反模式：

```astro
<!-- zh/index.astro（当前错误写法） -->
---
import HomePage from '../index.astro';
---
<HomePage />
```

Astro 的 CSS 注入机制只对**直接渲染的 Page** 生效，嵌套 Page 时 CSS 的
`<link rel="stylesheet">` 标签不会被注入到 `<head>`，导致线上样式完全丢失。

**新方案彻底消除 `zh/` 目录**，无需任何 URL 路由，CSS 问题自然消失。

---

## 总体架构

```
旧架构（URL 路由 i18n）          新架构（客户端 i18n）
─────────────────────────        ─────────────────────────
/            → 英文首页           /            → 中英文首页（同一页面）
/zh/         → 中文首页           /about       → 中英文关于（同一页面）
/about       → 英文关于           /projects/[id] → 中英文项目（同一页面）
/zh/about    → 中文关于
/projects/[id]    → 英文项目
/zh/projects/[id] → 中文项目
```

**语言状态存储**：`localStorage.getItem('lang')` → `'en'` | `'zh'`，默认 `'en'`

**语言切换机制**：
1. `<html>` 上设置 `data-lang="en"` 或 `data-lang="zh"` 属性
2. CSS 通过 `[data-lang="zh"] .lang-zh { display: block }` 控制显隐
3. `<head>` 内的 **inline script**（非 defer/async）在 DOM 渲染前读取
   localStorage 并设置 `data-lang`，避免语言闪烁（FOUC）

---

## 文件改动清单

### 1. 删除文件

```
frontend/src/pages/zh/          ← 整个目录删除
├── index.astro
├── about.astro
└── projects/
    └── [id].astro
```

### 2. 修改 `data/i18n.ts`

- **删除** `isChinese()` 函数（不再需要 pathname 检测）
- **保留** `localeText` 和 `caseStudyText` 的全部数据（结构不变）
- **保留** `Locale = 'en' | 'zh'` 类型导出

### 3. 修改 `frontend/src/layouts/Layout.astro`

**核心变更**：

a. **在 `<head>` 最前面**加入 inline script（零延迟执行，避免语言闪烁）：
```html
<script is:inline>
  (function() {
    // 优先级：localStorage（用户手动选择过）> 浏览器语言 > 默认英文
    var saved = localStorage.getItem('lang');
    var lang;
    if (saved) {
      lang = saved;
    } else {
      var browserLang = navigator.language || 'en';
      lang = browserLang.startsWith('zh') ? 'zh' : 'en';
    }
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  })();
</script>
```

语言检测优先级：
1. `localStorage`（用户曾手动切换过，尊重用户选择）
2. `navigator.language`（浏览器/系统语言，`zh-CN` / `zh-TW` / `zh-HK` 等均识别为中文）
3. 默认英文（其他所有语言 fallback）

b. **语言切换按钮**：从 `<a href="/zh">` 改为 `<button>` + JS 事件：
```html
<button id="lang-toggle">
  <span class="lang-en">中文</span>
  <span class="lang-zh">EN</span>
</button>

<script is:inline>
  document.getElementById('lang-toggle').addEventListener('click', function() {
    var html = document.documentElement;
    var newLang = html.getAttribute('data-lang') === 'zh' ? 'en' : 'zh';
    html.setAttribute('data-lang', newLang);
    html.lang = newLang === 'zh' ? 'zh-CN' : 'en';
    localStorage.setItem('lang', newLang);
  });
</script>
```

c. **Nav 和 Footer 文字**：改为双语 span：
```html
<span class="lang-en">Case Studies</span>
<span class="lang-zh">案例研究</span>
```

d. **`<title>` 标签**：通过 `data-title-en` / `data-title-zh` 属性传入，
   inline script 在加载时动态设置正确标题：
```html
<title data-en={titleEn} data-zh={titleZh}>{titleEn}</title>
<!-- inline script 读取 data-lang 后更新 document.title -->
```

### 4. 修改 `frontend/src/styles/global.css`

新增语言显隐 CSS 规则：
```css
/* 默认：英文显示，中文隐藏 */
.lang-zh { display: none; }
.lang-en { display: inline; }

/* 当 html[data-lang="zh"] 时翻转 */
[data-lang="zh"] .lang-zh { display: inline; }
[data-lang="zh"] .lang-en { display: none; }

/* block 级别变体（用于段落、div 等） */
.lang-zh-block { display: none; }
.lang-en-block { display: block; }
[data-lang="zh"] .lang-zh-block { display: block; }
[data-lang="zh"] .lang-en-block { display: none; }
```

### 5. 修改 `frontend/src/pages/index.astro`

- 移除服务端语言检测（`isChinese`、`locale` 变量）
- 直接引用 `localeText.en` 和 `localeText.zh`
- 所有文字节点改为双语 span，例如：

```astro
<!-- 旧 -->
<h1>{text.hero[0]}</h1>

<!-- 新 -->
<h1>
  <span class="lang-en">{localeText.en.home.hero[0]}</span>
  <span class="lang-zh">{localeText.zh.home.hero[0]}</span>
</h1>
```

### 6. 修改 `frontend/src/pages/about.astro`

同 index.astro 的模式，所有文字节点改为双语 span。

### 7. 修改 `frontend/src/components/ProjectCard.astro`

- 移除 `locale` prop（调用方不再传入）
- 直接同时渲染中英文数据：
```astro
<!-- 旧 -->
<h3>{locale === 'zh' ? project.zh.title : project.title}</h3>

<!-- 新 -->
<h3>
  <span class="lang-en">{project.title}</span>
  <span class="lang-zh">{project.zh.title}</span>
</h3>
```

### 8. 修改 `frontend/src/pages/projects/[id].astro`

这是最大的文件（888 行）。改动策略：

- 移除服务端 locale 检测，改为直接引用 `caseStudyText.en` 和 `caseStudyText.zh`
- 将所有文字内容改为双语 span 模式
- 项目内链（`href="/zh/projects/..."`）全部改为 `href="/projects/..."`
- 引入辅助变量简化代码：
  ```astro
  const en = caseStudyText.en;
  const zh = caseStudyText.zh;
  ```

### 9. 修改 `frontend/astro.config.mjs`

- 移除调试时加入的 `build.inlineStylesheets: 'never'`（回滚到原始配置）

---

## 不改动的文件

| 文件 | 理由 |
|------|------|
| `data/projects.ts` | 数据结构不变，中英文字段已有 |
| `data/i18n.ts` | 数据不变，只删 `isChinese()` 函数 |
| `frontend/public/` | 静态资源不变 |
| `.github/workflows/deploy.yml` | 部署流程不变 |
| `frontend/public/.nojekyll` | 保留（对 `_astro/` 目录仍有好处） |

---

## 执行顺序

```
Step 1  修改 global.css           → 加入 .lang-en / .lang-zh CSS 规则
Step 2  修改 astro.config.mjs     → 移除调试用 inlineStylesheets 配置
Step 3  修改 data/i18n.ts         → 删除 isChinese() 函数
Step 4  修改 Layout.astro         → inline script + 双语 Nav/Footer + 切换按钮
Step 5  修改 ProjectCard.astro    → 双语卡片，移除 locale prop
Step 6  修改 index.astro          → 双语首页内容
Step 7  修改 about.astro          → 双语关于页内容
Step 8  修改 [id].astro           → 双语项目详情页（最大改动）
Step 9  删除 zh/ 目录              → rm -rf frontend/src/pages/zh/
Step 10 本地 npm run build 验证   → 确认所有页面含 <link rel="stylesheet">
Step 11 git push                   → 触发 GitHub Actions 部署
```

---

## 验收标准

1. `https://evachen05.github.io/` 页面 CSS 和字体正确加载
2. 点击语言切换按钮后，**URL 不变**，页面所有文字切换为对应语言
3. 刷新页面后，语言偏好**被 localStorage 记住**，不出现语言闪烁（FOUC）
4. `/about` 和 `/projects/[id]` 同样正常切换
5. 原有的 `/zh/` 路径访问时返回 404（符合预期，已移除）
6. `dist/zh/` 目录不再生成

---

## 风险与注意事项

### HTML 体积
每个页面同时包含中英文两份文字，HTML 大小约增加 30-50%。
对于作品集网站（文字内容为主）完全可以接受，图片资源大小不变。

### [id].astro 改动量
这个文件有 888 行，包含 4 个项目（The Bridge、Makers Loop、RemindME、Museum of Glass）
的完整内容，改动量最大，需要最仔细地处理每处 en/zh 数据引用。

### title 标签处理
由于 `<title>` 由 SSG 静态生成，无法用 CSS 控制显隐。
建议通过 `data-title-en` / `data-title-zh` 属性在 Layout 里传入两种标题，
由 inline script 在读取 localStorage 后立即更新 `document.title`，
确保浏览器标签页显示正确语言的标题。
