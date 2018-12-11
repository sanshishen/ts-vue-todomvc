# 一、为什么选择TypeScript
TypeScript是JavaScript的超集，从这个名称就可以一窥作者的用意：类型脚本。它的设计目的应该是要解决JavaScript的“痛点问题”：弱类型和无命名空间，导致很难模块化，不适合开发大型程序。另外它还提供了一些语法糖来帮助大家更方便地实践面向对象的编程。
### 1. 编译时的强类型
TypeScript设计了一套类型机制来保证编译时的强类型判断，智能提示。
### 2. 模块化
利用TypeScript的关键词module，可以达到类似于命名空间的效果。
### 3. 其他优点
#### 1）容易上手
没有抛弃JavaScript的语法另起炉灶，而是做成了JavaScript的超集。这样任何合法的JavaScript的语句在TypeScript下都是合法的，也就是说学习成本很低。
#### 2）已有的类库可以很方便的使用
TypeScript允许你定义一些声明，声明已有的变量和类型，那么你可以很方便的用强类型的方式去调用已有的类库。
#### 3）语法糖
TypeScript可以实现类，接口，枚举，泛型，方法重载等，用简洁的语法丰富了JavaScript的使用。
# 二、项目搭建
#### 1. 文件目录

```txt
ts-vue-todomvc/
├─ dist/
└─ src/
   ├─ assets/
   ├─ components/
   ├─ main.ts
   ├─ models.ts
   ├─ router.ts
   ├─ store.ts
   ├─ utils.ts 
   └─ vue-shims.d.ts
├─ index.html
├─ package.json
├─ tsconfig.json
└─ webpack.config.js
```

#### 2. 安装webpack

安装最新版本或特定版本，运行以下命令之一

```bash
npm install --save-dev webpack
npm install --save-dev webpack@<version>
```
我们这次使用的是4.x版本，还需要安装CLI

```bash
npm install --save-dev webpack-cli
```
或者

```bash
npm install --save-dev webpack-command
```
> 官方推荐本地安装，这可以使我们在引入破坏式变更(breaking change)的依赖时，更容易分别升级项目。如果全局安装，会将项目中的webpack锁定到指定版本，并且在使用不同的webpack版本的项目中，可能会导致构建失败。
#### 3. 安装typescript

```bash
npm install --save-dev typescript ts-loader
```
#### 4. 安装vue

```bash
npm install --save vue vue-router vuex
# 安装vue对typescript的支持库，vuex-class属于第三方插件，现如今vuex的第三方插件支持都不是很理想
npm install --save-dev vue-property-decorator vuex-class
# 安装webpack插件
npm install --save-dev vue-loader vue-style-loader vue-template-compiler
```
#### 5. 其他

```bash
# webpack-dev-server 提供一个简单的web服务器，并且能够实时重新加载(live reloading)
npm install --save-dev webpack-dev-server
# html-webpack-plugin html模板插件，生成一个html文件，包含静态资源的输出路径
npm install --save-dev html-webpack-plugin
# css-loader 处理`.vue`文件中的`style`块
npm install --save-dev css-loader
# url-loader 处理图片背景和图标中的图片
npm install --save-dev url-loader
# clean-webpack-plugin 清除指定文件夹
npm install --save-dev clean-webpack-plugin
```
# 三、类型定义文件
TypeScript 相比 JavaScript 增加了类型声明，这些类型声明帮助编译器识别类型。`vue-shims.d.ts`为vue的类型定义文件