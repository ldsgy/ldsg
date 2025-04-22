# 落地生根

## 组件

### @ldsg/services 服务组件

### @ldsg/app 应用组件

服务于应用运行

### @ldsg/cms 内容管理系统（CMS）

## 发布

### 脚本

#### 本地发布 alpha 版本

```sh
# 发布指定模块并标记为 alpha
npx @dotenvx/dotenvx run -f .env.local -- pnpm publish --filter @ldsg/resource --tag alpha --no-git-checks

# 发布所有模块并标记为 alpha
npx @dotenvx/dotenvx run -f .env.local -- pnpm publish --filter "@ldsg/*" --tag alpha --no-git-checks

# 发布所有模块并标记为 latest
npx @dotenvx/dotenvx run -f .env.local -- pnpm publish --filter "@ldsg/*" --tag latest --no-git-checks
```

### 模块管理

```
# 根模块安装模块示例
pnpm add --save-dev ts-jest --workspace-root

# 子模块安装模块示例
pnpm i --save-dev @types/supertest supertest --filter @ldsg/app
```

### packages

| name            | description                                           |
| --------------- | ----------------------------------------------------- |
| core            | core service                                          |
| common          | utils and types that supports both browser and NodeJS |
| utils           | utils                                                 |
| cli             | cli                                                   |
| services        | services                                              |
| storage-service | storage service                                       |
| app             | application                                           |
| cms             | cms                                                   |

```shell
@ldsg/types
@ldsg/resource
@ldsg/resource-definition-part
@ldsg/handler
@ldsg/resource-definition
@ldsg/constants
@ldsg/*
```

```shell
pnpm --filter @ldsg/types build
pnpm --filter @ldsg/resource build
pnpm --filter @ldsg/resource-definition-part build
pnpm --filter @ldsg/handler build
pnpm --filter @ldsg/resource-definition build
pnpm --filter @ldsg/application build
pnpm --filter @ldsg/constants build
pnpm --filter @ldsg/common build
```
