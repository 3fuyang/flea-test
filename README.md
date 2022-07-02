# flea-test

Fwio

## 简介

使用 TDD 的思维，编写**迷你版**的 TJ Flea，仅用于练习 Vitest 和 Cypress 的使用。

组件测试使用了官方的 [@vue-test-utils](https://test-utils.vuejs.org/guide/) 库。

## 运行方法

```shell
npm install

# 集成测试（组件测试）
npm run test:unit

# 系统测试（E2E 测试）
npm run build

npm run test:e2e
```

## 注意

### 编辑器提示 Cypress 目录下 TS 类型错误

这是 VS Code 插件 Volar 的 [takeover mode](https://vuejs.org/guide/typescript/overview.html#takeover-mode) 导致的，在编写 Cypress 脚本时暂时关闭该模式即可。
