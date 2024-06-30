const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')

const userRoutes = require('./routes/userRoutes')

const app = express()
dotenv.config()

const PORT = process.env.PORT || 3000
const MONGODB_URL = process.env.MONGODB_URL


const bodyParser = require('body-parser')
//const bcrypt = require('bcrypt')
//const session = require('express-session')
//const MongoDBSession = require('connect-mongodb-session')(session)
//const { registerUser } = require('./controllers/user.controller.js')

async function connect() {
    try {
        await mongoose.connect(MONGODB_URL, {
        
        })
        console.log('Connected to DB!')
    } catch(error) {
        console.error('Error connecting to MongoDB', error.message)
    }
}
connect()

//const store = new MongoDBSession({
//    uri: MONGODB_URL,
//    collection: 'userSessions',
//})



//MIDDLEWARE

// Cross Origin Resource Sharing

app.use(cors())

//app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({extended: false}))


app.set("view engine", "ejs")

// SERVE STATIC FILES
app.use(express.static('./public'))
//app.use('/', express.static(path.join(__dirname, '/public')))

// ROUTES
app.use('/', userRoutes)


//app.use(
//    session({
//        secret: "string key that will sign cookie",
//        resave: false,
//        saveUninitialized: false,
//        store: store,
//    })
//)



app.get('/', (req, res) => {
    res.render("index.ejs")
})
app.get('/login', (req, res) => {
    res.render("login.ejs")
})
app.get('/register', (req, res) => {
    res.render("register.ejs")
})

app.post('/register', (req, res) => {
    //const { username, email, password } = req.body
})



app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})