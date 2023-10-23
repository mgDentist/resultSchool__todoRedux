import { useEffect, useState } from "react";
import style from "../App.module.css"

const GetTodos = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users/1/todos')
            .then((response) => response.json())
            .then((data) => setTodos(data))
            .catch((error) => console.error("Error fetching todos: ", error));
    }, []);

    return (
        <>
            <h1>Список дел</h1>
        <ul className={style.todoList}>
            {todos.map((todo)=>(
                <li className={style.todoListItem} key={todo.id}>{todo.title}</li>
            ))}
        </ul>
        </>
    );
};

export default GetTodos;