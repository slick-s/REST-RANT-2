// Modules/Globals
const express = require('express')
const methodOverride = require('method-override')
require('dotenv').config()
const PORT = process.env.PORT
const app = express()
const cors = require('cors')
const corConfig = {
    origin: "*",
    credential: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE' ]
}

app.options('', cors(corConfig))
app.use(cors(corConfig))

// Express Settings
app.set('view engine', 'jsx')
app.set('views', __dirname + '/views')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// Controllers and Routes
app.use('/places', require('./controllers/places'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('*', (req, res) => {
    res.render('error404')
})

app.listen(PORT)

module.exports = app