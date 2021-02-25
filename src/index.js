import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios"

import TodoItem from "./todoItem"
import Logo from "../src/images/logo.png"
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

  deleteTodo = (id) => {
    axios 
      .delete(`https://gms-flask-todo-api.herokuapp.com/todo/delete/${id}`)
      .then(() => {
        this.setState({
          todos: this.state.todos.filter(todo => {
            return todo.id !==id;
          })
        })
      })
  }

  renderTodos = () => {
    return this.state.todos.map(todo => {
      return <TodoItem key={todo.id} {...todo} deleteTodo={this.deleteTodo}/>
      
    })
  }

  render(){
    return(
      <div className="app">
        <div className="nav-bar">
          <img className="logo" src={Logo} alt="logo"/>
        </div>
        <div className="todo-container">
          <h1>Todo List</h1>
          <form className="add-todo" onSubmit={this.handleSubmit}>
            <input 
              className="input"
              type="text"
              placeholder="add todo item"
              onChange={this.handleChange}
              value={this.state.todo}
            />
            <button className="submit" type="submit">+</button>
          </form>
          {this.renderTodos()}
        </div>
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

