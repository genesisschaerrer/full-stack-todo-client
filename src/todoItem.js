import React, {useState} from "react"
import axios from "axios"

export default function TodoItem(props){
    const [done, setDone] = useState(props.done)

    const toggleDone = () => {
        //update Database
        axios 
            .patch(`https://gms-flask-todo-api.herokuapp.com/todo/${props.id}` , {
                //!done because whatever it is we want to flip it each time.
                done: !done
            })
            .then(() => setDone(!done))
            .catch(err => console.err("toggleDone: ", err))
        //update state
    }
    return(
        <div className="todo-item">
            <input
            type="checkbox"
            onClick={toggleDone}
            defaultChecked={done}
            />
            <p className="something">{props.title}</p>
            <button>Delete</button>
        </div>
    )
}
