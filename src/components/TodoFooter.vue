<!-- TodoFooter -->
<template>
    <footer class="todo-footer" v-show="list.length">
        <a id="clear-completed" @click="clearCompleted()">Clear {{done}} completed {{done === 1 ? 'item' : 'items'}}</a>
        <div class="todo-count"><b v-text="remaining"></b> {{remaining === 1 ? 'item' : 'items'}} left</div>
    </footer>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
import { Todo } from '../models';

@Component
export default class TodoFooter extends Vue {
    @State('list') public list!: Todo[];
    /* 清除所有已完成 */
    @Action('clearCompleted') public clearCompleted: any;

    get remaining (): number {
        return this.list.filter((item: Todo) => !item.done).length;
    }
    get done (): number {
        return this.list.filter((item: Todo) => item.done).length;
    }
}
</script>
<style>
.todo-footer {
    margin: 0 -20px -20px -20px;
    padding: 0 20px;
    color: #555;
    line-height: 37px;
    background: #f4fce8;
    border-top: 1px solid #ededed;
    border-radius: 0 0 5px 5px;
    overflow: hidden;
}
.todo-footer a {
    float: right;
    margin: 8px 0;
    padding: 0 10px 1px;
    font-size: 11px;
    color: #555;
    line-height: 20px;
    text-decoration: none;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 0 0;
    cursor: pointer;
}
</style>
