import { TaskList } from "@/todo/components/task-list/task-list"

const Home = () => {
  const data = [
    { id: 1, title: "hello", completed: false, deleteText: () => console.log("helllo") },
    { id: 2, title: "저녁 뭐먹을지 정하기", completed: true, deleteText: () => console.log("hihihi") },
    { id: 3, title: "운동계획 구하기", completed: false, deleteText: () => console.log("third text") },
  ]
  return (
    <div>
      <TaskList userData={data} />
    </div>
  )
}

export default Home
