const express = require("express")
const PORT = process.env.PORT || 3000
const path = require("path")

const app = express()
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "../public/views"))

app.get("/", (req, res) => {
    res.render("index")
})

app.listen(PORT, () => {
    console.log("Server Running!")
})