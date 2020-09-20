import React, {useState} from "react"
import ReactDOM from 'react-dom'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import './Modal.css'

function Modal(props) {
    //state редактируемого объекта
    let [todo, setTodo] = useState(props.todos)

    //Перезаписывает title у объекта. Такая конструкция сделана для того чтобы не терять остальные параметры пре перезаписи
     function handleChangeTodo(title) {
        setTodo({ id: todo.id,title: title, date: todo.date, completed: todo.completed })
    }

    //Перезаписывает date у объекта. Такая конструкция сделана для того чтобы не терять остальные параметры пре перезаписи
    function handleChangeDate(date) {
        setTodo({ id: todo.id,title: todo.title, date: date, completed: todo.completed })
    }

    return ReactDOM.createPortal(
        <div className='modal'>
            <div className='modal__body'>
                <button
                    className='removeBtn'
                    onClick={() => props.onClose()} //Метод закрывающий модальное окно
                >
                    <FontAwesomeIcon icon='times' />
                </button>
                <div>
                    <div>
                        <h3>Текст задачи:</h3>
                        <input
                            type="text"
                            value={todo.title}
                            onChange={e => handleChangeTodo(e.target.value)} //Отправляет методу изменённый текст
                        />
                    </div>
                    <div>
                        <h3>Дата:</h3>
                        <input
                            type="text"
                            value={todo.date}
                            onChange={e => handleChangeDate(e.target.value)} //Отправляет методу изменённую дату
                        />
                    </div>
                </div>
                <div>
                    <button
                        className='changeBtn'
                        onClick={() => props.onSave(todo)} //Отправляет методу полностью весть объект
                    >Изменить</button>
                </div>
            </div>
        </div>,
        document.getElementById('portal')
    )
}


export default Modal