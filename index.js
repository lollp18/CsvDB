"use strict"
const port = 80
const http = require("http")

const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const UserRouter = require("./routers/Users")

const app = express()

const server = http.createServer(app)

app.use(bodyParser.json({ limit: "50mb" }))
app.use(express.json())
app.use("/users", UserRouter)

server.listen(port, () => {
  console.log("geht")
})
