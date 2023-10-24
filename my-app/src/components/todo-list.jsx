import { useEffect, useState } from "react";
import { ref, onValue, push, set, remove } from "firebase/database";
import { db } from "../firebase";
import style from "../App.module.css";

const GetTodos = () => {
    const [todos, setTodos] = useState({});
    const [newTodo, setNewTodo] = useState("");
    const [editingTodo, setEditingTodo] = useState(null);
    const [editedTodos, setEditedTodos] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [isSorted, setIsSorted] = useState(false);


    useEffect(() => {
        const dbRef = ref(db, "todos");
        return onValue(dbRef, (snapshot) => {
            const data = snapshot.val() || {};
            setTodos(data);
        });
    },
        []);

    const addTodo = () => {
        const dbRef = ref(db, "todos");
        push(dbRef, { title: newTodo });
        setNewTodo("");
    };

    const editTodo = (id) => {
        const dbRef = ref(db, `todos/${id}`);
        set(dbRef, { title: editedTodos[id] });
        setEditingTodo(null);
    };

    const deleteTodo = (id) => {
        const dbRef = ref(db, `todos/${id}`);
        remove(dbRef);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const toggleSorting = () => {
        setIsSorted(!isSorted);
    };

    const sortedTodos = isSorted
    ? Object.entries(todos).sort((a, b) => a[1].title.localeCompare(b[1].title))
    : Object.entries(todos);

    return (
        <>
            <h1>Список дел</h1>
            <button
                className={style.todoListItemButton}
                onClick={toggleSorting}>
                {isSorted ? "Отключить сортировку" : "Включить сортировку"}
            </button>

            <div>
                <input
                    className={style.todoListItemInput}
                    type="text"
                    placeholder="Поиск дела"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                />

            </div>
            <ul className={style.todoList}>
                {sortedTodos.map(([id, todo]) => (
                    <li
                        className={`${style.todoListItem} ${todo.title && todo.title.includes(searchQuery) && searchQuery !== "" ? style.highlight : ""
                            }`}
                        key={id}
                    >
                        {editingTodo === id ? (
                            <div>
                                <input
                                    className={style.todoListItemInput}
                                    type="text"
                                    value={editedTodos[id] || todo.title}
                                    onChange={(e) => {
                                        const newEditedTodos = { ...editedTodos };
                                        newEditedTodos[id] = e.target.value;
                                        setEditedTodos(newEditedTodos);
                                    }}
                                />
                                <button onClick={() => editTodo(id)}>
                                    Ок
                                </button>
                            </div>
                        ) : (
                            <div className={style.wrapper}>
                                {todo.title}
                                <div className={style.innerWrapper}>
                                    <button
                                        className={style.todoListItemButton}
                                        onClick={() => setEditingTodo(id)}>Редактировать</button>
                                    <button
                                        className={style.todoListItemButton}
                                        onClick={() => deleteTodo(id)}>Удалить</button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <div>
                <input
                    className={style.todoListItemInput}
                    type="text"
                    placeholder="Добавить новое дело"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button
                    className={style.todoListItemButton}
                    onClick={addTodo}>Добавить</button>
            </div>
        </>
    );
};

export default GetTodos;