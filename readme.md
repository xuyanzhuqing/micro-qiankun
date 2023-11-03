启动工程

```bash
pnpm install && pnpm dev
```

打包工程
```bash
pnpm build
```

pnpm [过滤](https://pnpm.io/zh/filtering#--filter-package_name)启动某单独工程
```bash
pnpm --filter main run start
```

本工程采用 [pnpm workspace](https://pnpm.io/zh/workspaces) & [gulp.js](https://gulpjs.com/docs/en/getting-started/quick-start) 进行任务编排