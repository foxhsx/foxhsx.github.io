# hugo-theme-paper

A clean, minimal, developer-first Hugo theme focused on content readability.

Inspired by [antfu.me](https://antfu.me/), [VitePress](https://vitepress.dev/), and [vitepress-theme-minimalism](https://github.com/izhichao/vitepress-theme-minimalism).

## Design Principles

- **Content First** — UI stays out of the way
- **Developer Minimalism** — large whitespace, typography-driven, minimal color
- **Markdown Native** — adapts to Markdown structure
- **Static First** — optimized for SSG performance

## Features

- Clean, readable article layout
- Top navigation bar (replaces sidebar)
- Dark/Light mode toggle
- Client-side search
- Tag-based content discovery
- Table of Contents
- Previous/Next article navigation
- Responsive design
- Comment system support (Waline, Giscus, etc.)
- Code syntax highlighting (Catppuccin theme)

## Installation

### As Git Submodule

```bash
git submodule add https://github.com/foxhsx/hugo-theme-paper.git themes/hugo-theme-paper
```

### As Hugo Module

```bash
hugo mod init github.com/foxhsx/foxhsx.github.io
hugo mod get github.com/foxhsx/hugo-theme-paper
```

## Configuration

See [exampleSite/hugo.yaml](exampleSite/hugo.yaml) for a complete configuration example.

### Minimum Configuration

```yaml
theme: hugo-theme-paper

params:
  title: My Blog
  description: A developer blog
  sidebar:
    subtitle: Welcome to my blog
  article:
    readingTime: true
    math: false
  colorScheme:
    default: auto
    toggle: true
  dateFormat:
    published: "2006-01-02"
    lastUpdated: "Jan 02, 2006 15:04 MST"
```

## Customization

### Styles

Place your custom SCSS in `assets/scss/custom.scss` at your site root.

### Scripts

Place your custom TypeScript in `assets/ts/custom.ts` at your site root.

### Icons

Add custom SVG icons to `assets/icons/` at your site root.

## License

MIT
