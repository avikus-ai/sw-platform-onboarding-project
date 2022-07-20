import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"

import { TaksRow } from "./index"

const renderComponent = () =>
  render(<TaksRow id={1} title="점심 메뉴 정하기" completed={false} deleteText={() => console.log("delete")} />)

describe("TaskRow Component", () => {
  describe("rendering TaskRow Component", () => {
    it("props로 받은 text가 화면에 나와야한다", () => {
      renderComponent()
      const titleProps = screen.getByText("점심 메뉴 정하기")

      expect(titleProps).toBeInTheDocument()
    })
  })

  describe("user가 체크박스를 클릭함", () => {
    it("체크박스가 해제되어야한다", () => {
      renderComponent()
      const checkBox = screen.getByRole("checkbox")

      fireEvent.change(checkBox, { target: { checked: false } })

      expect(checkBox).not.toBeChecked()
    })
  })

  describe("user가 삭제버튼을 누른다", () => {
    it("props로 받은 deleteText함수가 실행되어야한다", () => {
      const deleteClick = jest.fn()
      render(<TaksRow id={1} title="점심 메뉴 정하기" completed={false} deleteText={deleteClick} />)
      const deleteButton = screen.getByRole("button")

      userEvent.click(deleteButton)

      expect(deleteClick).toHaveBeenCalled()
    })
  })

  describe("유저가 text가 들어가있는 요소를 더블클릭한다", () => {
    it("span태그가 input생성되면서 input의 value값은 그대로여야한다", () => {
      renderComponent()
      const titleSpan = screen.getByText("점심 메뉴 정하기")

      userEvent.dblClick(titleSpan)
      const inputText = screen.getByRole("textbox")

      expect(inputText).toHaveValue("점심 메뉴 정하기")
    })

    describe("input에 값을 넣고 엔터키를 클릭한다", () => {
      it("다시 span태그로 변경되어야한다", () => {
        renderComponent()
        const titleSpan = screen.getByText("점심 메뉴 정하기")

        userEvent.dblClick(titleSpan)
        const inputText = screen.getByRole("textbox")

        userEvent.clear(inputText)
        userEvent.type(inputText, "mytest")

        userEvent.type(inputText, "{enter}")
        const changedTitleSpan = screen.getByText("mytest")

        expect(changedTitleSpan).toBeInTheDocument()
      })
    })
  })

  describe("빈 텍스트를 input창에 입력하고 엔터를 클릭한다", () => {
    it("props로 받은 삭제기능을 하는 함수가 실행 되어야한다", () => {
      const deleteClick = jest.fn()

      render(<TaksRow id={1} title="점심 메뉴 정하기" completed={false} deleteText={deleteClick} />)
      const titleSpan = screen.getByText("점심 메뉴 정하기")

      userEvent.dblClick(titleSpan)
      const inputText = screen.getByRole("textbox")
      userEvent.clear(inputText)
      userEvent.type(inputText, "{enter}")

      expect(deleteClick).toHaveBeenCalled()
    })
  })
})
