import React, { useState } from "react"

import styles from "./task-row.module.css"

interface TaskRowProps {
  id: number
  title: string
  completed: boolean
  deleteText: () => void
  changeText: (id: number, text: string) => void
}

export const TaksRow = ({ id, title, completed, deleteText, changeText }: TaskRowProps) => {
  const [isTextInput, setIsTextInput] = useState(false)
  // const [text, setText] = useState(title)
  const [isChecked, setIsChecked] = useState(completed)
  // 컴포넌트에서 text, ischecked를 따로 관리하지않고 Props로 text 또는 checked의 유무를 인자로 서버에다가
  // 데이터를 넘겨주는 함수를 받아서 변경된값을 다시 받아서 핸들링하면 가능할거 같습니다.

  const keyPressEvevnt = (e: any) => {
    const text = e.target.value
    if (e.key !== "Enter") return
    if (e.key === "Enter" && title) {
      changeText(id, text)
      setIsTextInput(false)
      return
    }
    deleteText()
    setIsTextInput(false)
  }

  const handleDoubleClick = () => {
    if (isChecked) return
    setIsTextInput(true)
  }

  return (
    <>
      <input width={"30px"} type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
      {isTextInput ? (
        <input
          type={"text"}
          value={title}
          onChange={(e) => changeText(id, e.target.value)}
          onKeyDown={(e) => keyPressEvevnt(e)}
          autoFocus
        />
      ) : isChecked ? (
        <del className={styles.title} onDoubleClick={handleDoubleClick}>
          {title}
        </del>
      ) : (
        <span className={styles.title} onDoubleClick={handleDoubleClick}>
          {title}
        </span>
      )}

      <button type="button" data-testid="xBtn" className={styles.Xbtn} onClick={deleteText}>
        &times;
      </button>
    </>
  )
}
