import React from "react"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import TodoList from "./task-list"
import { TaskListProps } from "./task-list"

describe("<TodoList />", () => {
  const samples: TaskListProps = {
    tasks: [
      {
        id: "1",
        title: "task 1",
        isChecked: false,
      },
      {
        id: "2",
        title: "task 2",
        isChecked: false,
      },
    ],
    handleTaskComplete: jest.fn(),
    handleTaskDelete: jest.fn(),
  }

  it("renders todo list", () => {
    render(
      <TodoList
        tasks={samples.tasks}
        handleTaskComplete={samples.handleTaskComplete}
        handleTaskDelete={samples.handleTaskDelete}
      />
    )

    const tasks = screen.getAllByRole("checkbox")

    expect(tasks.length).toBe(2)
  })

  it("calls handle functions", () => {
    const testComplete = jest.fn()
    const testDelete = jest.fn()
    render(<TodoList tasks={samples.tasks} handleTaskComplete={testComplete} handleTaskDelete={testDelete} />)

    const taskCheckbox1 = screen.getByRole("checkbox", { name: samples.tasks[0].title })
    const deleteButton1 = screen.getAllByRole("button")[0]
    userEvent.click(taskCheckbox1)
    userEvent.click(deleteButton1)

    expect(testComplete).toBeCalledTimes(1)
    expect(testDelete).toBeCalledWith(samples.tasks[0].id)
  })

  it("completes one task", () => {
    samples.tasks[0].isChecked = true
    render(
      <TodoList
        tasks={samples.tasks}
        handleTaskComplete={samples.handleTaskComplete}
        handleTaskDelete={samples.handleTaskDelete}
      />
    )

    const taskCheckbox1 = screen.getByRole("checkbox", { name: samples.tasks[0].title }) as HTMLInputElement
    const taskCheckbox2 = screen.getByRole("checkbox", { name: samples.tasks[1].title }) as HTMLInputElement

    expect(taskCheckbox1.checked).toEqual(true)
    expect(taskCheckbox2.checked).toEqual(false)
  })
})
