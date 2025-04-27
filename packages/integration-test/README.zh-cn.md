# 集成测试

TODO:

[ ] 不知道为啥第二遍执行会报错`pnpm test packages/integration-test/src/__tests__/test_by_cases.ts`，需要在删除`dist`文件夹后才能再次执行成功，二次生成的文件与首次没有任何差异。需要注意的是，即使是将`dist`文件夹移到至项目内其他位置。如根目录下，依然会导致二次执行报错。由于并不阻塞项目整体开发，在尝试数小时后，暂时放弃。
