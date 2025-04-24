# 落地生根

## 组件

### @ldsg/services 服务组件

### @ldsg/app 应用组件

服务于应用运行

### @ldsg/cms 内容管理系统（CMS）

## 发布

### 脚本

#### 构建

```sh
# 构建
pnpm build
```

#### 本地发布版本

在 .env.local 配置 NPM_TOKEN 环境变量，token 从 [npm](https://www.npmjs.com/settings/wanxger/tokens) 获取。

```env
NPM_TOKEN=xxx
```

```sh
# 发布指定模块并标记为 alpha
npx @dotenvx/dotenvx run -f .env.local -- pnpm publish --filter @ldsg/resource --tag alpha --no-git-checks

# 发布所有模块并标记为 alpha
npx @dotenvx/dotenvx run -f .env.local -- pnpm publish --filter "@ldsg/*" --tag alpha --no-git-checks

# 发布所有模块并标记为 latest
npx @dotenvx/dotenvx run -f .env.local -- pnpm publish --filter "@ldsg/types" --tag latest --no-git-checks
```

### 模块管理

```
# 根模块安装模块示例
pnpm add --save-dev ts-jest --workspace-root

# 子模块安装模块示例
pnpm i --save-dev @types/supertest supertest --filter @ldsg/app
```

### 模块

| 名称                     | 标题         | 描述                                  |
| ------------------------ | ------------ | ------------------------------------- |
| app-template             | 应用模板     |
| application              | 应用         | 应用资源定义                          |
| common                   | 通用         | NodeJS 和浏览器平台下均可用的实用工具 |
| constants                | 常量         |
| create-app               | 创建应用     | 用于创建 Express 应用入口             |
| handler                  | 处理程序     |
| handler-part             | 处理程序部分 |
| integration-test         | 集成测试     |
| prepare                  | 准备         |
| resource                 | 资源         |
| resource-definition      | 资源定义     |
| resource-definition-part | 资源定义部分 |
| resource-instantiator    | 资源实例化器 |
| types                    | 类型         | 声明所有基本类型                      |
| utils                    | 实用工具     | 仅 NodeJS 平台下可用的实用工具        |
