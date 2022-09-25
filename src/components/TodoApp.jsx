import React, { useReducer, useState, useRef } from 'react'

export default function TodoApp() {

    const [textAdd, setTextAdd] = useState("")
    const [textSearch, setTextSearch] = useState("")

    const ADD = "add"
    const DELETE = "delete"
    const FILTER = "filter"

    const initialState = [
        { id: 1, title: "Task 1" },
        { id: 2, title: "Task 2" }
    ]

    


    const reducer = (state, action) => {
        switch (action.type) {
            case ADD:
                return textAdd ? [...state, action.payload] : state;

            case DELETE:
                return state.filter((todo) => todo.id !== action.payload);

            case FILTER:
                return state.filter((todo) => todo.title.includes(textSearch)).map(todo => todo)

            default:
                return state;
        }
    }

    const [todoState, todoDispatch] = useReducer(reducer, initialState)

    const miRef1 = useRef()
    const miRef2 = useRef()

    const handleInput = () => {
        setTextAdd(miRef1.current.value)
        console.log(miRef1.current.value);
    }

    const handleSearch = () => { 
        setTextSearch(miRef2.current.value)
        todoDispatch({ type: FILTER, payload: textSearch })
        console.log(miRef2.current.value)
     }

    const addTask = (e) => {
        //e.preventDefault()
        const newTodo = { id: Date.now(), title: textAdd }
        todoDispatch({
            type: ADD,
            payload: newTodo
        })
    }
    return (
        <div>
            <h1 style={{ color: "gold" }}>Tasks</h1>
            <div style={{ marginBottom: '10px' }}>
                <input style={{ marginRight: '10px' }} placeholder='Add / Update your task' value={textAdd} type="text" ref={miRef1} onChange={handleInput} />
                <button onClick={addTask}>Add Task</button>
            </div>
            <div>
                <input style={{ width:"250px" }} placeholder='Search Task' value={textSearch} ref={miRef2} onChange={handleSearch} />
            </div>
            <ol>
                {todoState.map((todo, index) => <li style={{ marginBottom: '4px' }} key={index}>{todo.title} &nbsp;
                    <button onClick={() => todoDispatch({ type: DELETE, payload: todo.id })}>Delete</button></li>)}
            </ol>
        </div>

    )
}
