/**
 * 类型定义
 * @date    2018-09-14 16:35:28
 * @version 1.0.0
 */

/* 待办事项 */
export interface Todo {
    id: string; // 唯一标识
    title: string; // 标题
    done: boolean; // 是否完成
}
/* state状态 */
export interface State {
    list: Todo[]; // 待办事宜列表
}