import { Todo } from '@/definitions/Todo';
import { TodoService } from '@/services/TodoService';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import './App.css';

function App() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [inputTodo, setInputTodo] = useState('');
    const [todos, setTodos] = useState<Todo[]>([]);

    const todosQueryResult = useQuery({
        queryKey: ['initTodos'],
        queryFn: TodoService.getTodos,
    });

    if (todosQueryResult.isLoading) {
        return <div>Loading...</div>;
    }

    if (todosQueryResult.isError) {
        return <div>Error</div>;
    }

    if (!todosQueryResult.data) {
        return <div>No data</div>;
    }

    if (!isLoaded) {
        setTodos(todosQueryResult.data);
        setIsLoaded(true);
    }

    const addTodo = async () => {
        await TodoService.addTodo({
            name: inputTodo,
            done: false,
        });
        const todos = await TodoService.getTodos();
        setTodos(todos);
        setInputTodo('');
    };

    const toggleTodo = async (id: number) => {
        const newTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, done: !todo.done };
            }
            return todo;
        });
        setTodos(newTodos);
        await TodoService.toggleTodo(id);
    };

    const deleteTodo = async (id: number) => {
        await TodoService.deleteTodo(id);
        const todos = await TodoService.getTodos();
        setTodos(todos);
    };

    return (
        <>
            <div className="container">
                <h1>React + Hono + D1 + Cloudflare</h1>
                <form
                    action=""
                    onSubmit={(e) => {
                        {
                            e.preventDefault();
                            addTodo();
                        }
                    }}
                >
                    <input
                        type="text"
                        value={inputTodo}
                        onChange={(e) => setInputTodo(e.target.value)}
                    />
                    <button type="submit">Add</button>
                </form>
                <table className="todoTable" border={1}>
                    <thead>
                        <tr>
                            <th>Done</th>
                            <th>Todo</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map((todo) => (
                            <tr key={todo.id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={todo.done}
                                        onChange={() => toggleTodo(todo.id)}
                                    />
                                </td>
                                <td>{todo.name}</td>
                                <td>
                                    <button
                                        onClick={() => {
                                            deleteTodo(todo.id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default App;
