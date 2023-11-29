import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "../App.module.css"
import { fetchTodos, addTodo, deleteTodo, editTodo } from "../store/actions/todoActions";


const GetTodos = () => {
    const dispatch = useDispatch();
    const todos = useSelector(state => state.todos.todos);
    const [newTodo, setNewTodo] = useState("");
    const [editingTodo, setEditingTodo] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const addTodoHandler = () => {
        dispatch(addTodo(newTodo));
        setNewTodo("");
    };

    const deleteTodoHandler = (id) => {
        dispatch(deleteTodo(id));
    };

    const startEditing = (id, title) => {
        setEditingTodo(id);
        setEditedTitle(title);
    };

    const editTodoHandler = () => {
        dispatch(editTodo(editingTodo, editedTitle));
        setEditingTodo(null);
        setEditedTitle("");
    };

    const handleNewTodoChange = (event) => {
        setNewTodo(event.target.value);
    };

    const handleEditedTitleChange = (event) => {
        setEditedTitle(event.target.value);
    };

    // JSX
    return (
        <div>
            <h1>Список дел</h1>
            <div>
                <input
                    className={style.todoListItemInput}
                    value={newTodo}
                    onChange={handleNewTodoChange}
                    placeholder="Добавить новое дело"
                />
                <button
                    className={style.todoListItemButton}
                    onClick={addTodoHandler}>Добавить</button>
            </div>
            <ul className={style.todoList}>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {editingTodo === todo.id ? (
                            <div>
                                <input
                                    className={style.todoListItemInput}
                                    value={editedTitle}
                                    onChange={handleEditedTitleChange}
                                />
                                <button
                                    className={style.todoListItemButton}
                                    onClick={editTodoHandler}>Сохранить</button>
                            </div>
                        ) : (
                            <div className={style.wrapper}>
                                {todo.title}
                                <div className={style.innerWrapper}>
                                    <button
                                        className={style.todoListItemButton}
                                        onClick={() => startEditing(todo.id, todo.title)}>
                                        Редактировать
                                    </button>
                                    <button
                                        className={style.todoListItemButton}
                                        onClick={() => deleteTodoHandler(todo.id)}>
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GetTodos;

// const GetTodos = () => {
//     const [todos, setTodos] = useState([]);
//     const [newTodo, setNewTodo] = useState("");
//     const [editingTodo, setEditingTodo] = useState(null);
//     const [editedTodos, setEditedTodos] = useState({});
//     const [searchQuery, setSearchQuery] = useState("");
//     const [isSorted, setIsSorted] = useState(false);


//     useEffect(() => {
//         fetch("http://localhost:3001/todos")
//             .then((response) => response.json())
//             .then((data) => setTodos(data))
//             .catch((error) => console.error("Ошибка получения данных: ", error));
//     }, []);

//     const addTodo = () => {
//         fetch("http://localhost:3001/todos", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ title: newTodo }),
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 setTodos([...todos, data]);
//                 setNewTodo("");
//             })
//             .catch((error) => console.error("Ошибка добавления данных: ", error));
//     };

//     const editTodo = (id, title) => {
//         fetch(`http://localhost:3001/todos/${id}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ title: editedTodos[id] }),
//         })
//             .then(() => {
//                 const updatedTodos = todos.map((todo) => {
//                     if (todo.id === id) {
//                         todo.title = editedTodos[id];
//                     }
//                     return todo;
//                 });
//                 setTodos(updatedTodos);
//             })
//             .catch((error) => console.error("Ошибка редактирования данных: ", error));
//         setEditingTodo(null);
//     };

//     const deleteTodo = (id) => {
//         fetch(`http://localhost:3001/todos/${id}`, {
//             method: "DELETE",
//         })
//             .then(() => {
//                 setTodos(todos.filter((todo) => todo.id !== id));
//             })
//             .catch((error) => console.error("Ошибка удаления данных: ", error));
//     };

//     const handleSearch = (query) => {
//         setSearchQuery(query);
//     };

//     const toggleSorting = () => {
//         setIsSorted(!isSorted);
//     };

//     const sortedTodos = isSorted
//         ? [...todos].sort((a, b) => a.title.localeCompare(b.title))
//         : todos;

//     return (
//         <>
//             <h1>Список дел</h1>
//             <button
//                 className={style.todoListItemButton}
//                 onClick={toggleSorting}>
//                 {isSorted ? "Отключить сортировку" : "Включить сортировку"}
//             </button>

//             <div>
//                 <input
//                     className={style.todoListItemInput}
//                     type="text"
//                     placeholder="Поиск дела"
//                     value={searchQuery}
//                     onChange={(e) => handleSearch(e.target.value)}
//                 />
//             </div>
//             <ul className={style.todoList}>
//                 {sortedTodos.map((todo) => (
//                     <li
//                         className={`${style.todoListItem} ${todo.title.includes(searchQuery) && searchQuery !== "" ? style.highlight : ""
//                             }`}
//                         key={todo.id}
//                     >
//                         {editingTodo === todo.id ? (
//                             <div>
//                                 <input
//                                     className={style.todoListItemInput}
//                                     type="text"
//                                     value={editedTodos[todo.id] || todo.title}
//                                     onChange={(e) => {
//                                         const newEditedTodos = { ...editedTodos };
//                                         newEditedTodos[todo.id] = e.target.value;
//                                         setEditedTodos(newEditedTodos);
//                                     }}
//                                 />
//                                 <button onClick={() => editTodo(todo.id)}>
//                                     Ок
//                                 </button>
//                             </div>
//                         ) : (
//                             <div className={style.wrapper}>
//                                 {todo.title}
//                                 <div className={style.innerWrapper}>
//                                     <button
//                                         className={style.todoListItemButton}
//                                         onClick={() => setEditingTodo(todo.id)}>Редактировать</button>
//                                     <button
//                                         className={style.todoListItemButton}
//                                         onClick={() => deleteTodo(todo.id)}>Удалить</button>
//                                 </div>
//                             </div>
//                         )}
//                     </li>
//                 ))}
//             </ul>
//             <div>
//                 <input
//                     className={style.todoListItemInput}
//                     type="text"
//                     placeholder="Добавить новое дело"
//                     value={newTodo}
//                     onChange={(e) => setNewTodo(e.target.value)}
//                 />
//                 <button
//                     className={style.todoListItemButton}
//                     onClick={addTodo}>Добавить</button>
//             </div>
//         </>
//     );
// };

// export default GetTodos;