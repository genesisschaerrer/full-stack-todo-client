import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios"

import TodoItem from "./todoItem"
import './styles.css';




class App extends Component {
  constructor(){
    super()

    this.state={
      todo: "",
      todos: []
    }
  }

  componentDidMount(){
    axios
      .get("https://gms-flask-todo-api.herokuapp.com/todos")
      .then(res => {
        this.setState({
          todos: res.data
        })
      })
      .catch(err => console.err(err))
  }

  handleChange = (e) => {
    this.setState({
      todo: e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    //post to api
    axios 
      .post("https://gms-flask-todo-api.herokuapp.com/todo", {
      title: this.state.todo,
      done: false
      }) 
      .then(res => {
        this.setState({
          todos: [...this.state.todos, res.data],
          todo: ""
        })
      })
      .catch(err => console.err("handleSubmit Error:", err))
  }

  renderTodos = () => {
    return this.state.todos.map(todo => {
      return <TodoItem key={todo.id} {...todo}/>
      
    })
  }

  render(){
    return(
      <div className="app">
        <h1>Todo List</h1>
        <form className="add-todo" onSubmit={this.handleSubmit}>
          <input 
            type="text"
            placeholder="add todo item"
            onChange={this.handleChange}
            value={this.state.todo}
          />
          <button type="submit">Add</button>
        </form>
        {this.renderTodos()}
      </div>
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

