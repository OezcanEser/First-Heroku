// import von express
const express = require("express")

// Server erstellen / initialisieren
const app = express()

// Port festlegen
// So schauen wir, ob wir live sind, wenn ja, die kommt die PORT Varaible dorther
// Ansonsten nehmen wir die 3000
const PORT = process.env.PORT || 3000

// Statische Dateien servieren
app.use(express.static("public"))

// Wir definieren, mit welcher Methode die Anfrage kommt: .get
// Aufbau (PFAD, CALLBACK)
app.get("/", (req, res) => {
    //res.send("Hallo from express")

    // sendFile nur für HTML,
    // (PFAD, {OPTIONENKEY: OPTIONENVALUE, ...})
    res.sendFile("./views/index.html", { root: __dirname })
})
app.get("/about", (req, res) => {
    res.sendFile("./views/about.html", { root: __dirname })
})

app.get("/about-me", (req, res) => {
    // Weiterleisung zu einer URL
    res.redirect("/about")
})

const heros = [
    { name: "Supermann", age: 22 },
    { name: "Batmann", age: 23 }
]

app.get("/api", (req, res) => {
    res.json(heros)
})

app.get("/api/:paramsname", (req, res) => {
    // console.log(req)
    // console.log(req.params)
    console.log(req.params.paramsname)
    // res.send(req.params.paramsname)
    res.json(heros[req.params.egal])
})

app.use((req, res) => {
    // Status setzen
    // res.status(404)
    // res.sendFile("./views/404.html", { root: __dirname })

    // Verketten von Methoden
    res.status(404).sendFile("./views/404.html", { root: __dirname })
})

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`))