import React from 'react'
import TodoItem from "./TodoItem"
import PropTypes from 'prop-types'

function TodoList(props) {
    //Отдаём компоненту TodoItem props которые пришли в компонент
    return (
        <ul>
            {props.todos.map((todo,index) => {
                return <TodoItem
                    todo={todo} //state todos
                    key={todo.id} //Ключ
                    index={index} //Индекс для отображения номера задачи
                    onChange={props.onChange} //Метод работающий с флагом todo.completed
                    onRemove={props.onRemove} //Метод удаляющий задачу
                    onSettings={props.onSettings} //Метод позволяющий отредактировать задачу
                />})}
        </ul>
    )

}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onSettings: PropTypes.func.isRequired
}

export default TodoList