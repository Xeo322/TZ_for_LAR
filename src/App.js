import React, {useEffect, useState} from 'react'
import TodoList from "./TodoList"
import Modal from './Modal'

function App() {
    //state объектов
    let [todos, setTodos] = useState([
        {id: 0,title: 'Сверстать', date: new Date().toLocaleDateString(), completed: true},
        {id: 1,title: 'Закодить', date: new Date().toLocaleDateString(), completed: false}
    ])
    //state модального окна
    let [modal, setModal] = useState(false)
    //state объекта, который хочет изменить пользователь
    let [chose, setChose] = useState(0)
    //state чекбокса отвечающего за показ/скрытие пунктов
    let [checked, setChecked] = useState(false)

    //Берём данные из localStorage
    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem('todos'))
        //Меняем state с объектами
        setTodos(todos)
    },[])

    //Меняем флаг completed у выбранного объекта
    function completedHandler(id){
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed
            }
            return todo
        }))
        //Записываем изменения в localStorage
        handleFormSubmit()
    }

    //Сохраняем изменения которые пришли с модального окна
    function handleSaveState(props) {
        setTodos(todos.map(todo => {
            if (todo.id === props.id) {
                todo.date = props.date
                todo.title = props.title
            }
            return todo
        }))
        //Закрываем модальное окно
        toggleModal()
        //Записываем изменения в localStorage
        handleFormSubmit()
    }

    //Меняем state чекбокса который отвечает за показ/скрытие выполненых пунктов
    function showHandler () {
        setChecked(checked = !checked)
    }

    //Удаляем объект по id который пришёл
    function removeHandler(id){
        setTodos(todos.filter(todo => todo.id !== id))
        //Записываем изменения в localStorage
        handleFormSubmit()
    }

    //Записываем state todos в localStorage с ключом 'todos'
    function handleFormSubmit() {
        localStorage.setItem('todos', JSON.stringify(todos))
    }

    //Меняем state modal для того чтобы открыть модальное окно
    function toggleModal() {
        setModal(modal = !modal)
    }

    //Функция принимает в качестве props объект который приходит из компонента TodoItem
    function modalHandler(props){
        //Открываем модальное окно
        toggleModal()
        //Записываем state chose
        setChose(props)
    }

    return (
        <div className="App">
            <div className='wrapper'>
                <h1>TZ for LAR</h1>
                <header>
                    <h5>ID</h5>
                    <h5>Наименование</h5>
                    <h5>Дата</h5>
                    <h5>Статус</h5>
                    <h5>Действия</h5>
                </header>
                <div className='rmCheckbox'>
                    <input
                        type="checkbox"
                        onChange={showHandler}
                        checked={checked}
                    />
                    <p>Скрыть выполненные</p>
                </div>
                <TodoList
                    todos={checked ? todos.filter(todo => todo.completed === false) : todos} //Если state checked равен true, тогда мы отправляем компоненту только те объекты, у которых
                                                                                             //поле completed равно false, иначе отправляем все объекты
                    onChange={completedHandler}
                    onRemove={removeHandler}
                    onSettings={modalHandler}
                />
                </div>
            <div>
                {modal &&
                <Modal
                    todos={chose}
                    onClose={toggleModal}
                    onSave={handleSaveState}
                />}
            </div>
            </div>
        )


}

export default App;
