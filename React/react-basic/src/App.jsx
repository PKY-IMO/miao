// import React,{Component} from 'react' 
//   此处{Component} 不是解构赋值，而是用了默认暴露  export class Component
// import {Component} from 'react' 
//   解构赋值 export default react + 定义了react.Componet

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React, { Component } from 'react'
import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer'
import { Button, Menu } from 'vivy'

import './App.css'



export default class App extends Component {

  // 初始化状态
  state = {
    todos:[{
        id: '001',
        name: '吃饭',
        done: true
      },{
        id: '002',
        name: '睡觉',
        done: false
      },{
        id: '003',
        name: 'code',
        done: true
      }
    ]
  }

  // addTodo 用于添加一个todo
  addTodo = (todoObj) => {
    // 获取原todos
    const {todos} = this.state
    // 追加一个todo
    const newTodos = [todoObj,...todos]
    this.setState({todos:newTodos})
  }

  // 更新todo
  updateTodo = (id, done) => {
    const {todos} = this.state
    const newTodos = todos.map((todoObj) => {
      if (todoObj.id === id) return {...todoObj, done: done}
      else return todoObj
    })
    this.setState({todos: newTodos})
  }

  // 删除一个todo
  deleteTodo = (id) => {
    const {todos} = this.state
    const newTodos = todos.filter((todoObj)=>{
      return todoObj.id !== id
    })
    this.setState({todos: newTodos})
  }

  // 全选
  checkAllTodo = (done) => {
    const {todos} = this.state
    const newTodos = todos.map((todoObj) => {
      return {...todoObj, done: done}
    })
    this.setState({todos: newTodos})
  }

  deleteDoneTodos = () => {
    const {todos} = this.state
    const newTodos = todos.filter((todoObj) => {
      return !todoObj.done
    })
    this.setState({todos: newTodos})
  }

  render() {
    const {todos} = this.state
    return (
      <div className="todo-container">
        <div className="todo-wrap">
          <Header addTodo={this.addTodo}/>
          <List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo}/>
          <Footer todos={todos} checkAllTodo={this.checkAllTodo} deleteDoneTodos={this.deleteDoneTodos}/>
        </div>
        <Button btnType='primary' >vivy</Button>
        <Menu
          className="test"
          defaultIndex="0"
          mode="horizontal"
          onSelect={function noRefCheck() {}}
        >
          <Menu.Item>
            menu1
          </Menu.Item>
          <Menu.Item>
            menu2
          </Menu.Item>
          <Menu.Item>
            menu3
          </Menu.Item>
          <Menu.SubMenu title="dropdown">
            <Menu.Item>
              submenu1
            </Menu.Item>
            <Menu.Item>
              submenu2
            </Menu.Item>
            <Menu.Item>
              submenu3
            </Menu.Item>
          </Menu.SubMenu>
          </Menu>
     </div>
    )
  }
}
