## 一、快速上手
### 1. 安装typescript

```sh
npm install -g typescript
```
### 2. 构建第一个typescript文件
创建一个greeter.ts文件

```js
interface Person {
    firstName: string;
    lastName: string;
}
class Student {
    fullName: string;
    constructor (public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + ' ' + middleInitial + ' ' + lastName;
    }
}
function greeter(person: Person) {
    return 'hello, ' + person.firstName + ' ' + person.lastName;
}
let user = new Student('Jade', 'M.', 'User');
document.body.innerHTML = greeter(user);
```
## 二、TypeScript Vue Starter
> 原文地址：[TypeScript Vue Starter](https://github.com/Microsoft/TypeScript-Vue-Starter#typescript-vue-starter)
### 1. 初始化项目
创建文件夹

```sh
mkdir typescript-vue-tutorial
cd typescript-vue-tutorial
```
最终目录结构

```txt
typescript-vue-tutorial/
├─ dist/
└─ src/
   └─ components/
```
TypeScript文件将从`src`文件夹开始，通过TypeScript编译，然后是webpack打包，最后在`dist`文件夹中生成一个`bundle.js`。所有组件都放在`src/components`文件夹。webpack最终会为我们生成`dist`目录。
### 2. 初始化项目
将文件夹变为一个npm管理的包。
```sh
npm init -y
```
### 3. 安装依赖
保证安装TypeScript，Webpack，Vue和一些必备加载器(loaders)。

```sh
npm install --save-dev typescript webpack webpack-cli ts-loader css-loader vue vue-loader vue-template-compiler
```
### 4. 添加TypeScript配置文件
在根目录下添加`tsconfig.json`，该文件包含一系列输入文件的编译设置。

```json
{
    "compilerOptions": {
        "outDir": "./built/",
        "sourceMap": true,
        "strict": true,
        "noImplicitReturns": true,
        "module": "es2015",
        "moduleResolution": "node",
        "target": "es5"
    },
    "include": [
        "./src/**/*"
    ]
}
```
注意`strict`属性设置为true。有一点，TypeScript的`noImplicitThis`属性需要打开去影响Vue文件，但是`strict`属性也提供了这一点，并且更严格（比如`noImplicitAny`和`strictNullChecks`）。为了更好的体验，我们强烈建议使用TypeScript的严格选项。
### 5. 添加Webpack
根目录下添加`webpack.config.js`文件

```js
var path = require('path'),
    webpack = require('webpack');

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    'scss': 'vue-style-loader!css-loader!sass-loader',
                    'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                }
            }
        }, {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
            options: {
                // 给.vue文件添加.ts或.tsx后缀
                // 在使用thread-loader和cache-loader加速构建时，会报Could not find file: '*.vue.ts'的错误
                // 解决方案是把ts代码从.vue文件中移出来，然后在vue文件中引入这个ts文件。
                appendTsSuffixTo: [/\.vue$/]
            }
        }, {
            test: /\.(png|jpe?g|gif|svg)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]?[hash]'
            }
        }]
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}
if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: false
        })
    ]);
}
```
### 6. 添加构建脚本
打开`package.json`，添加一个`build`命令来运行Webpack。

```json
"scripts": {
    "build": "webpack",
    "test": "echo \"Error: no test specified\" && exit 1"
},
```
添加了入口文件之后，我们就可以运行如下命令来构建

```sh
npm run build
```
运行如下命令，文件更改后自动触发构建

```sh
npm run build -- --watch
```
### 7. 创建一个基础项目
创建一个简陋的Vue & TypeScript例子。首先，创建一个文件`./src/index.ts`：

```js
// src/index.ts

import Vue from 'vue';

let v = new Vue({
    el: '#app',
    template: `
        <div>
            <div>Hello {{name}}!</div>
            Name: <input v-model="name" type="text"/>
        </div>`,
    data () {
        return {
            name: 'World'
        }
    }
})
```
根目录下创建一个`index.html`文件，并包含以下内容：

```html
<!doctype html>
<html>
    <head></head>
    <body>
        <div id="app"></div>
    </body>
    <script src="./dist/bundle.js"></script>
</html>
```
运行`npm run build`，在浏览器中打开`index.html`。（webpack 4.0中，需安装webpack-cli或webpack-command）。

将会看到一些文字比如`Hello World!`。除此之外，更改输入框的内容，文字将动态的改变。

### 8. 添加一个组件
如上所见，当你需要完成一个简单的任务时，Vue提供一个非常简单的接口。当我们的页面仅需要在两个元素间传达很少的数据时，Vue只需要编写很少的代码。

对于更复杂的任务，Vue很灵活，支持将我们的应用拆分成组件。

一个Vue组件声明如下：

```js
// src/components/Hello.ts

import Vue from 'vue'

export default Vue.extend({
    template: `
        <div>
            <div>Hello {{name}}{{exclamationMarks}}</div>
            <button @click="decrement">-</button>
            <button @click="increment">+</button>
        </div>
    `,
    props: ['name', 'initialEnthusiasm'],
    data () {
        return {
            enthusiasm: this.initialEnthusiasm
        }
    },
    methods: {
        increment () { this.enthusiasm++; },
        decrement () {
            if (this.enthusiasm > 1) {
                this.enthusiasm--;
            }
        }
    },
    computed: {
        exclamationMarks (): string {
            return Array(this.enthusiasm + 1).join('!');
        }
    }
});
```
组件含有两个按钮和一些文字。渲染的时候，它有一个初始的`name`和`initialEnthusiasm`，initialEnthusiasm代表我们想要展示的感叹号的数量。点击`+`按钮，会在文字的末尾添加一个感叹号，同样的点击`-`按钮，它会在文字末尾移除一个感叹号，除非降到只有一个。

Vue实例入口文件更改如下：

```js
// src/index.ts

import Vue from 'vue';
import HelloComponent from './components/Hello';

let v = new Vue({
    el: '#app',
    template: `
        <div>
            Name: <input v-model="name" type="text">
            <hello-component :name="name" :initialEnthusiasm="5" />
        </div>
    `,
    data: { name: 'World'},
    components: { HelloComponent }
});
```
然而，我们注意到使用Vue的单文件组件是相当流行的，让我们尝试将以上改写为单文件组件。
### 9. 单文件组件(Single File Components, SFC)
当使用Webpack或者Browserify，Vue提供一些插件，比如[vue-loader](https://github.com/vuejs/vue-loader)和[vueify](https://www.npmjs.com/package/vueify)，允许编写html风格的组件。这些以.vue结尾的文件，属于单文件组件。

在`.vue`文件中使用TypeScript，还有一些其他的事情需要落实到位，幸运的是，我们已经在半道上了。我们之前添加开发依赖的时候已经安装了vue-loader，同时在我们的`webpack.config.js`文件里指定了ts-loader的`appendTsSuffixTo: [/\.vue$/]`选项，允许TypeScript处理单文件组件提取出的代码。

一个额外的事，我们必须要告诉TypeScript当`.vue`文件被导入进来的时候看起来应该是什么样的。我们使用一个`vue-shims.d.ts`文件来做这件事：

```js
// src/vue-shims.d.ts

declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
}
```
我们不需要在每一个地方都引入这个文件。It's automatically included by TypeScript, and it tells it that anything imported that ends in `.vue` has the same shape of the Vue constructor itself.（该文件会被TypeScirpt自动引入，同时告诉它任何引入的以`.vue`结尾的文件都拥有相同的Vue自身构造结构。）

还有呢？编程体验。TypeScript带给我们最好的特性之一，是它的编辑器支持。为了在`.vue`文件中利用到这个特性，推荐使用[Visual Studio Code](https://code.visualstudio.com/)编辑器，并为Vue安装[Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)插件。

现在，让我们开始编写一个SFC！

```html
<!-- src/components/Hello.vue -->

<template>
    <div>
        <div class="greeting">Hello {{name}}{{exclamationMarks}}</div>
        <button @click="decrement">-</button>
        <button @click="increment">+</button>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: ['name', 'initialEnthusiasm'],
    computed: {
        exclamationMarks (): string {
            return Array(this.enthusiasm + 1).join('!');
        }
    },
    data () {
        return {
            enthusiasm: this.initialEnthusiasm
        }
    },
    methods: {
        increment () { this.enthusiasm ++;},
        decrement () {
            if (this.enthusiasm > 1) {
                this.enthusiasm --;
            }
        }
    }
});
</script>
<style>
.greeting {
    font-size: 20px;
}
</style>

```
在根实例中引入：

```
// src/index.ts

import Vue from 'vue';
import HelloComponent from './components/Hello.vue';

let v = new Vue({
    el: '#app',
    template: `
        <div>
            Name: <input v-model="name" type="text"/>
            <hello-component :name="name" :initialEnthusiasm="5"/>
        </div>`,
    data () {
        return {
            name: 'World'
        }
    },
    components: { HelloComponent }
})
```
关于单文件组件，注意几点：
- 必须要注明`<script lang="ts">`，TypeScript才能起作用。
- 必须要在`index.ts`中引入这些组件，同时组件要以`.vue`作为扩展名。
- 可以在组件里单独的`<style>`标签中书写css，但不可以在以`.ts`结尾的组件中书写。
- 默认导出是`Vue.extend`的调用（rather than the options bag itself相较于它自身的对象式）。如果不使用`Vue.extend`，Vetur插件也会让它看起来是正确有效的，但在编译你的项目时却会得到一个error。

运行`npm run build`，打开`index.html`，查看运行结果。

```txt
ERROR in ./src/components/Hello.vue
Module Error (from ./node_modules/vue-loader/lib/index.js):
vue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin in your webpack config.

```
> 官方的例子使用的是webpack 2.x + vue-loader 12.x，安装版本为webpack 4.x + vue-loader 15.x，配置文件有出入。

根据提示信息，vue-loader缺少相应的插件：`VueLoaderPlugin`，`webpack.config.js`文件修改如下：

```js
var VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    plugins: [
        new VueLoaderPlugin()
    ],
}
```
继续运行`npm run build`，查看运行结果。

```txt
ERROR in ./src/components/Hello.vue?vue&type=style&index=0&lang=css& (./node_modules/vue-loader/lib??vue-loader-options!./src/components/Hello.vue?vue&type=style&index=0&lang=css&) 36:0
Module parse failed: Unexpected token (36:0)
You may need an appropriate loader to handle this file type.
| 
| 
> .greeting {
|     font-size: 20px;
| }
 @ ./src/components/Hello.vue?vue&type=style&index=0&lang=css& 1:0-128 1:144-147 1:149-274 1:149-274
 @ ./src/components/Hello.vue
 @ ./src/index.ts

```
> 发生这个问题的原因是Vue CLI在升级到3.0版本时，对vue-loader 15.x版本插件推导机制进行了一些更改。代码中书写的`<style>`代码，必须声明用到的loader。原文地址：[从 v14 迁移](https://vue-loader.vuejs.org/zh/migrating.html#%E5%80%BC%E5%BE%97%E6%B3%A8%E6%84%8F%E7%9A%84%E4%B8%8D%E5%85%BC%E5%AE%B9%E5%8F%98%E6%9B%B4)。

`webpack.config.js`做一些更改：

```js
module.exports = {
    ...
    module: {
        rules: [
            ...
            { 
                test: /\.css$/,
                use: [{
                    loader: 'vue-style-loader'
                }, {
                    loader: 'css-loader'
                }]
            }
        ]
    }
}
```
运行`npm run build`， 在浏览器中打开`index.html`查看结果。
### 10. 使用装饰器定义组件
组件同样可以使用装饰器([decorators](https://www.typescriptlang.org/docs/handbook/decorators.html))定义。在两个附加的包的帮助下，（[vue-class-component](https://github.com/vuejs/vue-class-component)和[vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)），我们的组件可以以如下的方式书写：

```js
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class HelloDecorator extends Vue {
    @Prop() name!: string;
    @Prop() initialEnthusiasm!: number;

    enthuiasm = this.initialEnthusiasm;

    increment () {
        this.enthuiasm ++;
    }
    decrement () {
        if (this.enthuiasm > 1) {
            this.enthuiasm --;
        }
    }

    get exclamationMarks (): string {
        return Array(this.enthuiasm + 1).join('!');
    }
}
```
> vscode中会报一个错误：Experimental support for decorators is a feature that is subject to change in a future release. Set the 'experimentalDecorators' option to remove this warning. 在tsconfig中配置一下compilerOptions.experimentalDecorators为true即可（可能还需要重启编辑器）

我们创建一个继承自`Vue`的类并且使用来自`vue-class-component`包（从`vue-property-decorator`二次导出）的`@Component`装饰器装饰它，代替使用`Vue.extend`的方式来定义组件。

属性通过来自`vue-property-decorator`包的`@Prop()`装饰器给实例变量加前缀的方式定义。由于`--strictPropertyInitialization`选项是打开的，我们需要通过给属性加一个`!`的方式告诉TypeScript Vue将会初始化它们。这会告诉TypeScript: "嘿，放松，有人会给这个属性赋值。"

常规实例变量，比如例子中的`enthusiasm`，是自动可用于绑定到模板的数据，就像它们已经被定义在了`data`中。谨记为了正常绑定，所有的变量都要赋值，即使设置为`undefined`。

同样的，方法（比如`increment`）是被当做写入在`methods`块内对待，也是自动可用于模板。

最后，计算属性比如`exclamationMarks`是被简单的写作`get`访问器。