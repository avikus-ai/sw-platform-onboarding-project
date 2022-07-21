import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"

import { TaskList } from "./task-list"

describe("TaskList Component", () => {
  describe("컴포넌트 랜더링됐을때 화면", () => {
    it("text들이 화면에 랜더링 나오는지 확인", () => {
      const data = [
        { id: 1, title: "hellllo", completed: false, deleteText: () => console.log("helllo") },
        { id: 2, title: "점심 식사 구하기", completed: true, deleteText: () => console.log("hihihi") },
        { id: 3, title: "공부 계획 세우기", completed: false, deleteText: () => console.log("third text") },
      ]
      render(<TaskList userData={data} />)

      const firstPropsText = screen.getByText("점심 식사 구하기")
      const deleteButtons = screen.getAllByRole("button")

      expect(firstPropsText).toBeInTheDocument()
      expect(deleteButtons).toHaveLength(3)
    })
  })
})
