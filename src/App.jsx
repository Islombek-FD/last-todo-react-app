import React from 'react';
import './App.scss';

import Todo from './Components/Todo/Todo';

function App() {
	const localTodos = JSON.parse(window.localStorage.getItem('todos')) || [];

	const [todos, setTodos] = React.useState(localTodos);

	const [completed, setCompleted] = React.useState(() => {
		return localTodos.filter((todo) => todo.isCompleted === true).length;
	});

	const renderTodos = function (evt) {
		if (evt.code === 'Enter') {
			const newTodo = {
				id: localTodos[localTodos.length - 1]?.id + 1 || 0,
				title: evt.currentTarget.value,
				isCompleted: false,
			};

			setTodos([...localTodos, newTodo]);

			window.localStorage.setItem(
				'todos',
				JSON.stringify([...localTodos, newTodo]),
			);

			setCompleted(() => {
				return [...localTodos, newTodo].filter(
					(todo) => todo.isCompleted === true,
				).length;
			});
			evt.currentTarget.value = null;
		}
	};

	const todoDelete = function (evt) {
		const todoId = evt.currentTarget.dataset.todoId - 0;

		const filteredTodos = localTodos.filter((todo) => todo.id !== todoId);

		setTodos([...filteredTodos]);

		window.localStorage.setItem('todos', JSON.stringify(filteredTodos));

		setCompleted(() => {
			return [...filteredTodos].filter(
				(todo) => todo.isCompleted === true,
			).length;
		});
	};

	const todoCompleted = function (evt) {
		const todoId = evt.currentTarget.dataset.todoId - 0;

		const foundTodo = localTodos.find((todo) => todo.id === todoId);

		foundTodo.isCompleted = !foundTodo.isCompleted;

		setTodos([...localTodos]);

		window.localStorage.setItem('todos', JSON.stringify([...localTodos]));

		setCompleted(() => {
			return [...localTodos].filter((todo) => todo.isCompleted === true)
				.length;
		});
	};

	const allBtn = function () {
		setTodos(localTodos);
	};

	const completeBtn = function () {
		const filterCompletes = localTodos.filter(
			(todo) => todo.isCompleted === true,
		);

		setTodos(filterCompletes);
	};

	const uncompletedBtn = function () {
		const filterUncompletes = localTodos.filter(
			(todo) => todo.isCompleted === false,
		);

		setTodos(filterUncompletes);
	};

	return (
		<>
			<div
				className='container'
				style={{ backgroundColor: todos.length > 0 && 'teal' }}>
				<input
					className='todo__input'
					style={{ marginBottom: todos.length > 0 && 20 }}
					onKeyUp={renderTodos}
					type='text'
					placeholder='To todo todooooo ...'
				/>

				<ul className='todos__list'>
					{todos.map((todo) => (
						<Todo
							key={todo.id}
							title={todo.title}
							id={todo.id}
							isCompleted={todo.isCompleted}
							todoDelete={todoDelete}
							todoCompleted={todoCompleted}
						/>
					))}
				</ul>

				<div className='btn__group'>
					<button className='btn__all' onClick={allBtn}>
						All
						<strong className='all__todo-count'>
							{localTodos.length}
						</strong>
					</button>
					<button className='btn__completed' onClick={completeBtn}>
						Completed
						<strong className='completed__todo-count'>
							{completed}
						</strong>
					</button>
					<button
						className='btn_uncompleted'
						onClick={uncompletedBtn}>
						Uncompleted
						<strong className='uncompleted__todo-count'>
							{localTodos.length - completed}
						</strong>
					</button>
				</div>

				<div
					className='overflow'
					style={{
						backgroundColor: todos.length > 0 && 'orangered',
					}}></div>
			</div>
		</>
	);
}

export default App;
