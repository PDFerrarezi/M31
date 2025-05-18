const express = require("express")
const PORT = process.env.PORT || 3000
const path = require("path")

const app = express()
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "../public/views"))
app.use(express.static(path.join(__dirname, "../public/statics")))

app.get("/", (req, res) => {
    res.render("index")
})
app.get("/doe", (req, res) => {
    res.render("doacoes")
})
app.get("/patrocine", (req, res) => {
    res.render("patrocinio")
})
app.get("/contato", (req, res) => {
    res.render("contato")
})

app.listen(PORT, () => {
    console.log("Server Running!")
})