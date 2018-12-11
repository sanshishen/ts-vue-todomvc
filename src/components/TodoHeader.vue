<!-- TodoHeader -->
<template>
    <header class="header">
        <h1>Todos</h1>
        <input type="text" class="new-todo" placeholder="What needs to be done?" autofocus="autofocus" @keypress.13="createOnEnter()" v-model="inputContent">
    </header>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { uuidv4 } from '../utils';

@Component
export default class TodoHeader extends Vue {
    /* 添加一条记录 */
    @Action('createTodo') private createTodo!: any;
    /* 输入内容 */
    private inputContent: string = '';
    /**
     * 点击enter新增一条记录
     */
    private createOnEnter(event: Event) {
        if (this.inputContent === '') return;
        this.createTodo({
            id: uuidv4(),
            title: this.inputContent,
            done: false
        });
        this.inputContent = '';
    }
}
</script>
<style>
.header h1 {
    margin: 0.67em 0;
    padding: 0 0 10px 0;
    font-size: 36px;
    font-weight: bold;
    text-align: center;
}
.header input {
    width: 466px;
    padding: 6px;
    font-size: 24px;
    font-family: inherit;
    line-height: 1.4em;
    outline: none;
    -webkit-box-shadow: rgba(0, 0, 0, 0.2) 0 1px 2px 0 inset;
    box-shadow: rgba(0, 0, 0, 0.2) 0 1px 2px 0 inset;
    border: 1px solid #999;
}
.header input::-webkit-input-placeholder {
    font-style: italic;
}
</style>
