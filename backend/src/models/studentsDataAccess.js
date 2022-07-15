const db = require("./db")

exports.findAll = () => {
  return db
    .promise()
    .query("SELECT * FROM `student`")
    .then((result) => {
      db.end()
      return result[0]
    })
}

exports.findOne = (studentId) => {
  return db
    .promise()
    .query("SELECT * FROM `student` WHERE ID = ?", [studentId])
    .then(([result]) => result)
}

exports.addOne = (student) => {
  const { firstname, lastname, age, campus, remote } = student
  return db
    .promise()
    .query(
      "INSERT INTO `student` (firstname, lastname, age, remote) VALUES (?, ?, ?, ?)",
      [firstname, lastname, age, remote]
    )
    .then(([result]) => {
      return { id: result.insertId, firstname, lastname, age, remote }
    })
}

exports.replaceOne = (studentId, student) => {
  return db
    .promise()
    .query("UPDATE `student` SET ? WHERE ID = ?", [student, studentId])
    .then(([result]) => {
      return { id: studentId, ...student }
    })
}

exports.removeOne = (studentId) => {
  return db
    .promise()
    .query("DELETE FROM `student` WHERE ID = ?", [studentId])
    .then(([result]) => {
      if (result.affectedRows) {
        return true
      }
      return false
    })
}
