const express = require("express")

const router = express.Router()
const emailValidator = require("deep-email-validator")
const Users = new Map([
  [
    "Hans",
    {
      Username: "Hans",
      Email: "Hans123@gmail.com",
      Password: 12,

      Tabellen: [],
    },
  ],
])
console.log(Users)
const User = class {
  Tabellen = []
  constructor(Username, Email, Password) {
    this.Username = Username
    this.Email = Email
    this.Password = Password
  }
}

// POST

router.post("/Registrieren", async (req, res) => {
  try {
    const UserData = await req.body

    if (Users.has(UserData.Username).valueOf(false)) {
      res.status(201).send(JSON.stringify("UserTaken"))
    } else if (
      (await emailValidator.validate(UserData.Email)).valid === false
    ) {
      res.status(201).send(JSON.stringify("EmailInvalid"))
    } else if (UserData.Password !== UserData.PasswordWiederholen) {
      res.status(201).send(JSON.stringify("PasswordWiederholen"))
    } else {
      Users.set(
        `${UserData.Username}`,
        new User(UserData.Username, UserData.Email, UserData.Password)
      )

      res.status(201).send(JSON.stringify("UserErstelt"))
    }
    console.log(Users)
  } catch (error) {
    console.log(error)
  }
})

router.post("/Anmelden", async (req, res) => {
  try {
    const UserData = await req.body

    if (Users.has(UserData.Username) === false) {
      res.status(201).send(JSON.stringify("NoUser"))
    } else if (Users.get(UserData.Username).Password != UserData.Password) {
      res.status(201).send(JSON.stringify("Password"))
    } else {
      res
        .status(201)
        .send(JSON.stringify({ Angemeldet: true, Username: UserData.Username }))
    }
  } catch (error) {
    console.log(error)
  }
})

// GET

router.get("/:user/Tabellen", async (req, res) => {
  res.status(201).send(JSON.stringify(Users.get(req.params.user).Tabellen))
})

// PUT

router.put("/:user/Tabellen", async (req, res) => {
  Users.get(req.params.user).Tabellen = await req.body
  res.status(201).send(JSON.stringify("TabellenUpdated"))
})

router.delete("/:user/Tabellen", async (req, res) => {
  const tabelID = await req.body.id

  Users.get(req.params.user).Tabellen.splice(tabelID, 1)

  res.status(201).send(JSON.stringify("Gelöscht"))
})
module.exports = router
