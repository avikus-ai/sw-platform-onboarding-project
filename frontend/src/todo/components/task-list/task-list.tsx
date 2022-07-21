import React from "react"

import { TaksRow } from "../task-row/task-row"

interface PropsT {
  userData: { id: number; title: string; completed: boolean; deleteText: () => void }[]
}

export const TaskList = ({ userData }: PropsT) => {
  return (
    <div>
      {userData.map((data) => {
        return (
          <TaksRow
            key={data.id}
            id={data.id}
            title={data.title}
            completed={data.completed}
            deleteText={data.deleteText}
          />
        )
      })}
    </div>
  )
}
