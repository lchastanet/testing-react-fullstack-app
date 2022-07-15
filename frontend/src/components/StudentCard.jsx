import React from "react"
import { capitalize } from "../services/utils"

function StudentCard({ student }) {
  return (
    <div style={{ border: "solid black 1px", margin: "1em", padding: "1em" }}>
      <h2>Student</h2>
      <p>Prénom : {capitalize(student.firstname)}</p>
      <p>Nom : {capitalize(student.lastname)}</p>
      <p>Age : {student.age}</p>
      <p>Remote : {student.remote ? "Oui" : "Non"}</p>
    </div>
  )
}

export default StudentCard
