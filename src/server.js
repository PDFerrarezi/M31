const express = require("express")
const PORT = process.env.PORT || 3000
const path = require("path")
const nodemailer = require("nodemailer")
require("dotenv").config()

const emailTurma = process.env.EMAIl
const password = process.env.PASSWORD

const app = express()
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "../public/views"))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
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

app.post("/api/patrocinio", (req, res) => {
    const { nome, email, empresa, telefone, mensagem } = req.body

    const conteudoEmail = `<p><strong>Nome:</strong> ${nome}</p><p><strong>Empresa:</strong> ${empresa}</p><p><strong>Email:</strong> ${email}</p><p><strong>Telefone:</strong> ${telefone}</p><p><strong>Mensagem:</strong><br>${mensagem}</p><hr><p style="font-size: 12px; color: gray;">Mensagem enviada pelo formulário do site.</p>`

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: emailTurma,
            pass: password
        }
    })
    const Email = {
        from: emailTurma,
        to: emailTurma,
        subject: `Nova Proposta de Patrocínio`,
        html: conteudoEmail
    }
    transporter.sendMail(Email, (error, info) => {
        if (error) {
            res.status(500).json({ message: error })
        }
        else {
            res.status(200).json({ message: "Sucesso!" })
        }
    })
})

app.listen(PORT, () => {
    console.log("Server Running!")
})