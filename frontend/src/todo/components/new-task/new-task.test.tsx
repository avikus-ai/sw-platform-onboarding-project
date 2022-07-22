import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import NewTodo from "./new-task"
import { TaskProps } from "../task-row/task-row"

describe("<NewTodo />", () => {
  const samples: TaskProps[] = [
    {
      id: "1",
      title: "task 1",
      isChecked: false,
    },
  ]

  it("renders input and button", () => {
    render(<NewTodo tasks={samples} handleTaskCreate={jest.fn()} />)

    const taskInput = screen.getByRole("textbox")
    const checkButton = screen.getByRole("button")

    expect(taskInput).toBeInTheDocument()
    expect(checkButton).toBeInTheDocument()
  })

  it("changes text when input come", () => {
    render(<NewTodo tasks={samples} handleTaskCreate={jest.fn()} />)

    const taskInput = screen.getByRole("textbox")
    userEvent.type(taskInput, "todo 만들기")

    expect(taskInput).toHaveValue("todo 만들기")
  })

  it("creates task when enter pressed", () => {
    const createTest = jest.fn()
    render(<NewTodo tasks={samples} handleTaskCreate={createTest} />)

    const taskInput = screen.getByRole("textbox")
    userEvent.type(taskInput, "todo 만들기")
    userEvent.keyboard("{enter}")

    expect(createTest).toBeCalledTimes(1)
    expect(taskInput).toHaveValue("")
  })
})
