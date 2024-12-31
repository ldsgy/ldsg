# 落地生根

## 组件

### @ldsg/services 服务组件

### @ldsg/app 应用组件

服务于应用运行

### @ldsg/cms 内容管理系统（CMS）

## 脚本

### 发布

```sh
lerna publish --no-private
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
