import React, { useState } from "react"

import styles from "./task-row.module.css"

interface TaskRowProps {
  id: number
  title: string
  completed: boolean
  deleteText: () => void
}

export const TaksRow = ({ id, title, completed, deleteText }: TaskRowProps) => {
  const [isTextInput, setIsTextInput] = useState(false)
  const [text, setText] = useState(title)
  const [isChecked, setIsChecked] = useState(completed)

  const keyPressEvevnt = (e: any) => {
    if (e.key !== "Enter") return
    if (e.key === "Enter" && text) {
      setIsTextInput(false)
      return
    }
    deleteText()
  }

  const handleDoubleClick = () => {
    if (isChecked) return
    setIsTextInput(true)
  }

  return (
    <div>
      <input width={"30px"} type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
      {isTextInput ? (
        <input
          type={"text"}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => keyPressEvevnt(e)}
          autoFocus
        />
      ) : isChecked ? (
        <del className={styles.title} onDoubleClick={handleDoubleClick}>
          {text}
        </del>
      ) : (
        <span className={styles.title} onDoubleClick={handleDoubleClick}>
          {text}
        </span>
      )}

      <button type="button" className={styles.Xbtn} onClick={deleteText}>
        &times;
      </button>
    </div>
  )
}
