import React from "react"
import shortid from "shortid"

import { TaskProps } from "../task-row/task-row"

export interface NewTaskProps {
  tasks: TaskProps[]
  handleTaskCreate: (task: TaskProps) => void
}

const NewTodo = (props: NewTaskProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [value, setValue] = React.useState("")

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  function handlePressEnter(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      const newTask: TaskProps = {
        id: shortid.generate(),
        title: value,
        isChecked: false,
      }
      props.handleTaskCreate(newTask)
      if (inputRef && inputRef.current) {
        inputRef.current.value = ""
        setValue("")
      }
    }
  }

  return (
    <div>
      <form>
        <button type="submit">v</button>
        <input
          ref={inputRef}
          type="text"
          onChange={(event) => handleInputChange(event)}
          onKeyPress={(event) => handlePressEnter(event)}
          value={value}
          placeholder="What needs to be done?"
        />
      </form>
    </div>
  )
}

export default NewTodo
