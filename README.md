<div align="center">

<img src="https://www.notion.so/icons/circle-dashed_orange.svg?t=0e6a07fe-6983-4382-a350-27904f621da9" width="96" height="96" alt="one-hpc Logo" />

# one-hpc

**HPC 高性能计算知识库** —— 集群运维 · Slurm · 软件编译与安装分享

基于 [NotionNext](https://github.com/tangly1024/NotionNext)（Next.js + Notion API）构建，HEO 主题，Vercel 部署。

<p>
  <a href="https://a.111103.xyz/">在线访问</a>
  ·
  <a href="https://a.111103.xyz/category">文章分类</a>
  ·
  <a href="https://a.111103.xyz/tag">标签云</a>
</p>

</div>

---

## 站点简介

`one-hpc` 是一个面向 **HPC（高性能计算）** 领域的技术博客，长期沉淀以下方向的内容：

- **集群运维**：Slurm 作业调度、节点管理、任务排错
- **软件编译与安装**：LAMMPS、VASP、CP2K、Quantum ESPRESSO、Gaussian、ORCA、ANSYS Fluent、COMSOL 等科学计算软件的安装与作业脚本
- **系统优化**：Linux 内存清理、内核管理、时间同步、病毒查杀
- **硬件与存储**：RAID 阵列卡（MegaCli）、磁盘健康监控

内容全部在 **Notion** 中写作和管理，由 NotionNext 自动发布为网站。

## 技术栈

| 层 | 技术 |
| --- | --- |
| 框架 | Next.js（NotionNext 二次定制） |
| 数据源 | Notion API（one-hpc 数据库） |
| 主题 | HEO |
| 部署 | Vercel（GitHub 自动构建） |
| 评论/统计 | NotionNext 内置插件体系 |

## 自定义改动

在 NotionNext 原版基础上做了以下定制：

1. **分类页重构**：原版分类页仅有分类列表，重写为「分类墙」——每分类一张卡片，展示文章数 + 最新 3 篇预览，顶部统计分类数/文章总数
2. **加载优化**：移除「最新发布」「分类墙预览」等区域的文章封面图，页面体积下降约 30%
3. **首页卡片尺寸调优**：文章卡片压缩至 128px 高度，一屏展示更多文章
4. **分页调整**：每页 20 篇文章（配置中心 `POSTS_PER_PAGE=20`）

## 本地开发

```bash
# 1. 使用 Node 22
# 2. 安装依赖
yarn install

# 3. 配置环境变量（复制 .env.local.example 为 .env.local，填入 NOTION_PAGE_ID 和 NOTION_ACCESS_TOKEN）

# 4. 启动开发服务器
yarn dev
```

打开 http://localhost:3000 即可预览。

## 部署

本项目部署在 **Vercel**：

1. Fork 本仓库到你的 GitHub
2. 在 Vercel 导入仓库，填入环境变量（`NOTION_PAGE_ID`、`NOTION_ACCESS_TOKEN`）
3. 每次 push 到 main 自动构建部署

## 文档入口

- NotionNext 官方文档：https://notionnext.tangly1024.com/user-guide/start-here
- 主题全览：https://notionnext.tangly1024.com/user-guide/themes/THEMES_CATALOG
- 配置中心说明：详见 Notion 数据库「配置中心」页面（优先级最高，覆盖环境变量与 blog.config.js）

## License

MIT

---
*Powered by [NotionNext](https://github.com/tangly1024/NotionNext) · [Vercel](https://vercel.com)*
