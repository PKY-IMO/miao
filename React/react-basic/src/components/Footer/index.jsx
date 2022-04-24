import React, { Component } from 'react'
import './index.css'

export default class Footer extends Component {

  // 全选checkbox回调
  handleCheckedAll = (e) => {
    this.props.checkAllTodo(e.target.checked)
  }

  // 删除已完成
  handleDoneTodos = () => {
    if (window.confirm('确定删除？')) {
      this.props.deleteDoneTodos()
    }
  }

  render() {
    const { todos } = this.props
    const doneCount = todos.reduce((pre, todo) => pre + (todo.done? 1 : 0), 0)
    const total = todos.length
    return (
      <div className="todo-footer">
        <label>
          <input type="checkbox" checked={ total !== 0 && doneCount === total ? true : false} onChange={this.handleCheckedAll}/>
        </label>
        <span>
          <span>已完成{doneCount}</span> / 全部{total}
        </span>
        <button className="btn btn-danger" onClick={this.handleDoneTodos}>清除已完成任务</button>
      </div>
    )
  }
}
