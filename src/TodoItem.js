import React from "react"
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCog } from '@fortawesome/fontawesome-free-solid'

function TodoItem({todo, index, onChange, onRemove, onSettings}) {
    return (
        <li>
            <strong>{index + 1}</strong>
            <p>{todo.title}</p>
            <p>{todo.date}</p>
            <input
                type="checkbox"
                onChange={() => onChange(todo.id)} //Отправляет методу completedHandler id задачи
                checked={todo.completed}
                />
            <button
                className='settingsBtn'
                onClick={() => onSettings(todo)} //Отправляет методу modalHandler объект по которому кликнули
            >
                <FontAwesomeIcon icon={faCog}/>
            </button>
            <button
                className='removeBtn'
                onClick={() => onRemove(todo.id)} //Отправляет методу removeHandler id для удаления задачи
            >
                <FontAwesomeIcon icon={faTimes} />
            </button>
        </li>
    )
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    index: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onSettings: PropTypes.func.isRequired
}

export default TodoItem