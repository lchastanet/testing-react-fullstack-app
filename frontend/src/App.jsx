import { useEffect, useState } from "react"
import axios from "axios"
import StudentCard from "./components/StudentCard"
import SwitchButton from "./components/SwitchButton"

function App() {
  const [students, setStudents] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8000/students").then((res) => {
      console.log(res.data)
      setStudents(res.data)
    })
  }, [])

  return (
    <div className="App">
      <h1>Hello</h1>
      <SwitchButton />
      {students.map((student) => (
        <StudentCard key={student.id} student={student} />
      ))}
    </div>
  )
}

export default App
