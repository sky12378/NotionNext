<div align="center">

<img src="https://www.notion.so/icons/circle-dashed_orange.svg?t=0e6a07fe-6983-4382-a350-27904f621da9" width="96" height="96" alt="one-hpc Logo" />

# one-hpc

**HPC Knowledge Base** — Cluster Operations · Slurm · Software Compilation & Installation

Built with [NotionNext](https://github.com/tangly1024/NotionNext) (Next.js + Notion API), HEO theme, deployed on Vercel.

<p>
  <a href="https://a.111103.xyz/">Visit Site</a>
  ·
  <a href="https://a.111103.xyz/category">Categories</a>
  ·
  <a href="https://a.111103.xyz/tag">Tags</a>
</p>

[中文](./README.md) | English

</div>

---

## About This Site

`one-hpc` is a technical blog for the **HPC (High-Performance Computing)** domain, covering:

- **Cluster Operations**: Slurm job scheduling, node management, job troubleshooting
- **Software Compilation & Installation**: LAMMPS, VASP, CP2K, Quantum ESPRESSO, Gaussian, ORCA, ANSYS Fluent, COMSOL and other scientific computing software installation guides and job scripts
- **System Tuning**: Linux memory cleanup, kernel management, time synchronization, malware scanning
- **Hardware & Storage**: RAID controllers (MegaCli), disk health monitoring

All content is written and managed in **Notion**, published automatically by NotionNext.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js (customized NotionNext) |
| Data Source | Notion API (one-hpc database) |
| Theme | HEO |
| Deployment | Vercel (auto-build from GitHub) |
| Comments/Analytics | NotionNext plugin system |

## Customizations

Custom changes on top of the upstream NotionNext:

1. **Category page rebuilt**: original category index only listed categories; rebuilt as a "category wall" — each category is a card showing post count + latest 3 post previews, with category/post totals at top
2. **Performance optimization**: removed post cover images from "Latest Posts" and category preview areas; page size reduced ~30%
3. **Card size tuning**: homepage post cards compacted to 128px height, showing more posts per screen
4. **Pagination**: 20 posts per page (via `POSTS_PER_PAGE=20` in the config center)

## Local Development

```bash
# 1. Use Node 22
# 2. Install dependencies
yarn install

# 3. Configure environment variables (copy .env.local.example to .env.local, fill in NOTION_PAGE_ID and NOTION_ACCESS_TOKEN)

# 4. Start development server
yarn dev
```

Open http://localhost:3000 to preview.

## Deployment

This project is deployed on **Vercel**:

1. Fork this repository to your GitHub account
2. Import the repository in Vercel and set environment variables (`NOTION_PAGE_ID`, `NOTION_ACCESS_TOKEN`)
3. Every push to main triggers an automatic build and deploy

## Documentation

- NotionNext official docs: https://notionnext.tangly1024.com/user-guide/start-here
- Theme catalog: https://notionnext.tangly1024.com/user-guide/themes/THEMES_CATALOG
- Config center: see the "配置中心" page in the Notion database (highest priority, overrides environment variables and blog.config.js)

## License

MIT

---
*Powered by [NotionNext](https://github.com/tangly1024/NotionNext) · [Vercel](https://vercel.com)*
