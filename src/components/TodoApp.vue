<!-- TodoApp -->
<template>
    <div id="app" class="todo-app">
        <todo-header></todo-header>
        <todo-list></todo-list>
        <todo-footer></todo-footer>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import TodoHeader from './TodoHeader.vue';
import TodoList from './TodoList.vue';
import TodoFooter from './TodoFooter.vue';

@Component({
    components: {
        TodoHeader,
        TodoList,
        TodoFooter
    }
})
export default class TodoApp extends Vue {}
</script>
<style>
* {
    margin: 0;
    padding: 0;
}
body {
    font: 14px "Helvetica Neue", Helvetica, Arial, sans-serif;
    line-height: 1.4em;
    background: #eeeeee;
    color: #333333;
    width: 520px;
    margin: 0 auto;
    -webkit-font-smoothing: antialiased;
}
.todo-app {
    margin-bottom: 40px;
    padding: 20px;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, .2) 0 2px 6px 0;
    border-radius: 5px;
}
</style>
