<template>
    <section v-show="list.length">
        <input type="checkbox" id="toggle-all" :checked="allCompleted" @click="toggleAll($event)"/>
        <label for="toggle-all">Mark all as complete.</label>
        <ul class="todo-list">
            <li v-for="item in list" :key="item.id"
                :class="{'editing': editingId === item.id, 'done': item.done}"
                @dblclick="edit($event, item.id)">
                <div class="view">
                    <input type="checkbox" class="toggle" :checked="item.done" @click="toggle(item)"/>
                    <label v-text="item.title"></label>
                    <a class="destory" @click="remove(item)"></a>
                </div>
                <input type="text" class="edit" :value="item.title" @blur="blurHandler()"/>
            </li>
        </ul>
    </section>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
import { Todo } from '../models';

@Component
export default class TodoList extends Vue {
    @State('list') public list!: Todo[];
    /* toggle完成状态 */
    @Action('toggleDone') public toggleDone!: any;
    /* 移除一条待办 */
    @Action('removeTodo') public removeTodo!: any;
    /* toggle all. */
    @Action('toggleAllDone') public toggleAllDone!: any;
    /* 正在编辑的id */
    private editingId: string = '';
    /**
     * toggle all.
     * @param {Event} evt
     */
    private toggleAll(evt: any) {
        const checkbox: any = evt.currentTarget;
        this.toggleAllDone(checkbox.checked);
    }
    /**
     * 进入编辑状态
     * @param {string} id 条目id
     */
    private edit(event: any, id: string) {
        this.editingId = id;
        const target = event.currentTarget;
        this.$nextTick(() => {
            target.lastChild.focus();
        });
    }
    /**
     * 更改待办的状态
     */
    private toggle(todo: Todo) {
        this.toggleDone(todo);
    }
    /**
     * 移除一条todo
     * @param {Todo} todo 待办
     */
    private remove(todo: Todo) {
        this.removeTodo(todo);
    }
    /**
     * 修改框失焦事件
     */
    private blurHandler() {
        this.editingId = '';
    }
    get allCompleted (): boolean {
        return this.list.filter((item: Todo) => item.done).length === this.list.length;
    }
}
</script>
<style>
.todo-list {
    margin: 10px 0;
    list-style: none;
}
.todo-list li {
    position: relative;
    padding: 18px 20px 18px 0;
    font-size: 24px;
    border-bottom: 1px solid #ccc;
}
.todo-list li:last-child {
    border-bottom: none;
}
.todo-list li .edit {
    display: none;
    font-size: 24px;
    font-family: inherit;
    line-height: 1.4em;
    outline: none;
    -webkit-box-shadow: rgba(0, 0, 0, 0.2) 0 1px 2px 0 inset;
    box-shadow: rgba(0, 0, 0, 0.2) 0 1px 2px 0 inset;
    border: 1px solid #999;
}
.todo-list li.editing .edit {
    display: block;
}
.todo-list .destory {
    position: absolute;
    display: none;
    top: 20px;
    right: 5px;
    width: 20px;
    height: 20px;
    background: url('../assets/destroy.png') no-repeat;
    cursor: pointer;
}
.todo-list li:hover .destory {
    display: block;
}
.todo-list .destory:hover {
    background-position: 0 -20px;
}
.todo-list li.editing:last-child {
    margin-bottom: -1px;
}
.todo-list li.editing .edit {
    display: block;
    width: 444px;
    margin: 0;
    padding: 13px 15px 14px 20px;
}
.todo-list li.editing .view {
    display: none;
}
.todo-list li .view label {
    word-break: break-word;
}
.todo-list li.done .view label {
    color: #777;
    text-decoration: line-through;
}
</style>
