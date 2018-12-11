/**
 * entry file.
 * @date    2018-09-05 17:34:57
 * @version 1.0.0
 */
import Vue from 'vue';
import router from './router';
import store from './store';

const app = new Vue({
    el: '#app',
    router,
    store,
    template: '<router-view></router-view>'
});