/**
 * store.
 * @author  sanshishen
 * @email   sanshishen@qq.com
 * @date    2018-10-12 12:09:29
 * @version 1.0.0
 */
import Vue from 'vue';
import Vuex, { Commit } from 'vuex';
import { State, Todo } from './models';

Vue.use(Vuex);

const state: State = {
    list: []
};
// actions
const actions = {
    /**
     * 创建一个todo
     * @param context 上下文
     * @param todo 创建的todo
     */
    createTodo (context: { commit: Commit, state: State }, todo: Todo) {
        context.commit('createTodo', todo);
    },
    /**
     * toggle待办状态
     * @param todo 
     */
    toggleDone (context: { commit: Commit }, todo: Todo) {
        context.commit('toggleDone', todo);
    },
    /**
     * 更新一个todo
     * @param todo 更新的todo
     */
    updateTodo (context: { commit: Commit }, todo: Todo) {},
    /**
     * 移除一个todo
     * @param todo 移除的todo
     */
    removeTodo (context: { commit: Commit }, todo: Todo) {
        context.commit('removeTodo', todo);
    },
    /**
     * toggle all.
     * @param context 
     */
    toggleAllDone (context: { commit: Commit }, done: boolean) {
        context.commit('toggleAllDone', done);
    },
    /**
     * 清除所有已完成
     */
    clearCompleted (context: { commit: Commit }) {
        context.commit('clearCompleted');
    }
};
// mutations
const mutations = {
    createTodo (state: State, todo: Todo) {
        state.list.push(todo);
    },
    toggleDone (state: State, todo: Todo) {
        let index: number = -1;
        for (let i = 0; i < state.list.length; i ++) {
            if (state.list[i].id === todo.id) {
                index = i;
                break;
            }
        }
        const _todo: Todo = state.list[index];
        _todo.done = !_todo.done;
        state.list.splice(index, 1, _todo);
    },
    removeTodo (state: State, todo: Todo) {
        let index: number = -1;
        for (let i = 0; i < state.list.length; i ++) {
            if (state.list[i].id === todo.id) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            state.list.splice(index, 1);
        }
    },
    toggleAllDone (state: State, done: boolean) {
        const list: Todo[] = state.list;
        list.map((item: Todo) => {
            item.done = done;
            return item;
        });
        state.list = Object.assign([], state.list, list);
    },
    clearCompleted (state: State) {
        const list: Todo[] = state.list.filter((item: Todo) => !item.done);
        state.list = list;
    }
}

export default new Vuex.Store({
    state,
    actions,
    mutations
});