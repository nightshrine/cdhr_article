import { ApiService } from './ApiService';
import { AddTodo, Todo } from '@/definitions/Todo';

/**
 * Todoに関する処理を行う
 */
export class TodoService {
    /**
     * Todoを取得する
     */
    public static async getTodos(): Promise<Todo[]> {
        const todos = await ApiService.callGetApi<Todo[]>('/todos');
        return todos;
    }

    /**
     * Todoを追加する
     */
    public static async addTodo(todo: AddTodo): Promise<void> {
        await ApiService.callPostApi<AddTodo>('/todos', todo);
    }

    /**
     * Todoの完了状態を切り替える
     */
    public static async toggleTodo(id: number): Promise<void> {
        await ApiService.callPutApi(`/todos/${id}/toggle`);
    }

    /**
     * Todoを削除する
     */
    public static async deleteTodo(id: number): Promise<void> {
        await ApiService.callDeleteApi(`/todos/${id}`);
    }
}
