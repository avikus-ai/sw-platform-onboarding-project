import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"

import { NewTask } from "./new-task"
import Home from "../../../pages/index"

describe("newTask component test", () => {
  it("test add input text to props data", () => {
    const mockSetState = jest.fn()
    const data = [
      { id: 1, title: "hello", completed: false, deleteText: () => console.log("deleteText") },
      { id: 2, title: "저녁 메뉴 정하기", completed: true, deleteText: () => console.log("this is delete function") },
      { id: 3, title: "운동 계획 세우기", completed: false, deleteText: () => console.log(3) },
    ]

    render(<NewTask setData={mockSetState} userData={data} />)

    const textInput = screen.getByRole("textbox")
    userEvent.type(textInput, "새로운 데이터를 추가")
    userEvent.type(textInput, "{enter}")

    const textInfo = {
      id: 4,
      title: "새로운 데이터를 추가",
      completed: false,
      deleteText: () => console.log("deleteButton"),
    }
    const newUserData = data.concat(textInfo)

    expect(textInput).toHaveValue("")
    expect(mockSetState).toHaveBeenCalled()
    // expect(mockSetState(data, textInfo)).toEqual(newUserData)
  })
})
