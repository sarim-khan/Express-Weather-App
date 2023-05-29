const express = require('express')
const path = require('path')
const hbs = require('hbs')
require('dotenv').config('../.env')
const app = express()
const port = 8000

console.log(process.env.API_KEY);

const api_key = process.env.API_KEY
const static_path = path.join(__dirname, '../public')
const template_path = path.join(__dirname, '../templates/views')
const partials_path = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs');
app.set('views', template_path)
hbs.registerPartials(partials_path)

app.use(express.static(static_path))

app.get("/", (req, res) => {
    res.render('index')
})

app.get("/api", (req, res) => {
    return res.json({ api: api_key })
})

app.get("/about", (req, res) => {
    res.render('about')
})

app.get("/weather", (req, res) => {
    res.render('weather')
})

app.get("*", (req, res) => {
    res.render('404error', {
        errorMsg: "Oops! Page NotFound"
    })
})

app.listen(port, () => {
    console.log(`listening the port at ${port}`);
})

module.exports = api_key