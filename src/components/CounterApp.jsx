import React from 'react'
import { useReducer } from 'react'

const INCREMENT = "increment"
const DECREMENT = "decrement"
const RESET = "reset"

const initialState = 0

const reducer = (state, action) => {
   switch (action.type) {

    case INCREMENT:
        return state+1
    
    case DECREMENT:
        return state-1
    
    case RESET:
        return 0
    
    default:
        return state
   }
}

export default function CounterApp() {

    const [countState, countDispatch] = useReducer(reducer, initialState)

  return (
    <div>
        <p>CounterApp: {countState}</p>
        <button onClick={()=>countDispatch({type: INCREMENT})}>Increment</button>
        <button onClick={()=>countDispatch({type: DECREMENT})}>Decrement</button>
        <button onClick={()=>countDispatch({type: RESET})}>Reset</button>
    </div>

  )
}