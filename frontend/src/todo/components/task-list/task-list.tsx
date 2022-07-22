import React from "react"

import { TaskProps } from "../task-row/task-row"
import Todo from "../task-row/task-row"

export interface TaskListProps {
  tasks: TaskProps[]
  handleTaskComplete: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void
  handleTaskDelete: (id: string) => void
}

const TodoList = (props: TaskListProps) => {
  return (
    <div>
      <ul>
        {props.tasks.map((task) => (
          <ul key={task.id}>
            <Todo task={task} handleTaskComplete={props.handleTaskComplete} handleTaskDelete={props.handleTaskDelete} />
          </ul>
        ))}
      </ul>
    </div>
  )
}

export default TodoList
