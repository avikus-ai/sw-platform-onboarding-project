import React, { useState } from "react"

export interface TaskProps {
  id: string
  title: string
  isChecked: boolean
}

export interface TaskItemProps {
  task: TaskProps
  handleTaskComplete: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void
  handleTaskDelete: (id: string) => void
}

const Todo = (props: TaskItemProps) => {
  return (
    <div>
      <input
        type="checkbox"
        id={props.task.title}
        checked={props.task.isChecked}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.handleTaskComplete(event, props.task.id)}
      />
      <label htmlFor={props.task.title}>
        <span style={{ textDecoration: props.task.isChecked ? "line-through" : "none" }}>{props.task.title}</span>
      </label>
      <button onClick={() => props.handleTaskDelete(props.task.id)}>X</button>
    </div>
  )
}

export default Todo
