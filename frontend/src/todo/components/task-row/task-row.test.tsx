import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { TaskProps } from "../task-row/task-row"
import Todo from "./task-row"

describe("<Todo />", () => {
  const changeTest = jest.fn()
  const deleteTest = jest.fn()
  const sample: TaskProps = {
    id: "1",
    title: "task 1",
    isChecked: false,
  }

  it("renders task", () => {
    render(<Todo task={sample} handleTaskComplete={changeTest} handleTaskDelete={deleteTest} />)
    const taskCheckbox = screen.getByRole("checkbox")
    const title = screen.getByLabelText(sample.title).id
    const deleteButton = screen.getByRole("button")

    expect(taskCheckbox).toBeInTheDocument()
    expect(title).toEqual("task 1")
    expect(deleteButton).toBeInTheDocument()
  })

  it("completes task when true value comes", () => {
    sample.isChecked = true

    render(<Todo task={sample} handleTaskComplete={changeTest} handleTaskDelete={deleteTest} />)
    const taskCheckbox = screen.getByRole("checkbox") as HTMLInputElement

    expect(taskCheckbox.checked).toEqual(true)
  })

  it("is not complete task when false value comes", () => {
    sample.isChecked = false

    render(<Todo task={sample} handleTaskComplete={changeTest} handleTaskDelete={deleteTest} />)
    const taskCheckbox = screen.getByRole("checkbox") as HTMLInputElement

    expect(taskCheckbox.checked).toEqual(false)
  })

  it("calls handleTaskDelete when button clicked", () => {
    render(<Todo task={sample} handleTaskComplete={changeTest} handleTaskDelete={deleteTest} />)

    const deleteButton = screen.getByRole("button")
    userEvent.click(deleteButton)

    expect(deleteTest).toBeCalledWith(sample.id)
  })
})
