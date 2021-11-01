import './Todo.scss';

function Todo({ title, id, todoDelete, todoCompleted, isCompleted }) {
    return (
        <>
            <li className="todo__item"> 
                <input className="todo__checkbox" checked={isCompleted} 
                    data-todo-id={id} type="checkbox" onChange={todoCompleted} 
                />

                <span style={{textDecoration: isCompleted && 'line-through'}} className="todo__info">{title}</span>

                <button className="todo__delete-btn" onClick={todoDelete}
                    data-todo-id={id}> +
                </button>
            </li>
        </>
    )
}

export default Todo;