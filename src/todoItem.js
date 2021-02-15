import React, {useState} from "react"
import axios from "axios"

export default function TodoItem(props){
    const [done, setDone] = useState(props.done)

    const toggleDone = () => {
        //update Database
        axios 
            .patch(`https://gms-express-todo-api.herokuapp.com/${props.id}` , {
                //!done because whatever it is we want to flip it each time.
                done: !done
            })
            // .then(() => setDone(!done))
            .then(res => console.log(res))
            .catch(err => console.log("toggleDone: ", err))
        //update state
    }
    return(
        <div className="todo-item">
            <input
            className="checkbox"
            type="checkbox"
            onClick={toggleDone}
            defaultChecked={done}
            />
            <p className={done ? "done": ""}>{props.title}</p>
            <button className="remove" onClick={()=> props.deleteTodo(props.id)}>x</button>
        </div>
    )
}

