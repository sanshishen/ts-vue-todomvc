/**
 * 路由配置
 * @author  sanshishen
 * @email   sanshishen@qq.com
 * @date    2018-09-19 15:01:39
 * @version 1.0.0
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import TodoApp from './components/TodoApp.vue';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    component: TodoApp
}];

const router = new VueRouter({
    routes
});

export default router;