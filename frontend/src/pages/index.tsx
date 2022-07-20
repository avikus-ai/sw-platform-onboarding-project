import { TaksRow } from "@/todo/components/task-row"

const Home = () => {
  return (
    <div>
      <TaksRow id={1} title="hello" completed={true} deleteText={() => console.log("delete")} />
    </div>
  )
}

export default Home
