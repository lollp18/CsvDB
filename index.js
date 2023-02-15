"use strict"
const port = 80
const http = require("http")

const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()

const server = http.createServer(app)

app.use(bodyParser.json({ limit: "50mb" }))
app.use(express.json())

let tabels = []

app.post("/", async (req, res) => {
  console.log(req.body)

  tabels = await req.body

  res.status(201).send(JSON.stringify("erstelt"))
})

app.get("/", async (req, res) => {
  res.send(JSON.stringify(tabels))
})
app.delete("/", async (req, res) => {
  const tabelID = await req.body.id

  tabels.splice(tabelID, 1)

  console.log(tabels)
  res.status(201).send(JSON.stringify("Gelöscht"))
})
server.listen(port, () => {
  console.log("geht")
})
