const express = require("express")
const cors = require("cors")

require("dotenv").config()

const app = express()

app.use(express.json())
app.use(cors())

const studentsRoutes = require("./routes/studentsRoutes")

app.use("/students", studentsRoutes)

app.get("/*", (req, res) => {
  res.status(404).send({ message: "Not found !" })
})

module.exports = app
