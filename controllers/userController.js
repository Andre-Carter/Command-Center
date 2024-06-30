const bcrypt = require('bcrypt')

const User = require('../models/userModel')

const registerUser = async (req, res) => {
    const { username, email, password } = req.body

    try {
        const usernameExists = await User.findOne({ username: username })

        if (usernameExists) {
            console.log('username taken')
        }

        const user = new User({ username, email, password })
        
        await user.save()

        res.redirect('/login')
    } catch (error) {
        console.log('Unable to register')
        res.redirect('/register')
    }
}

const loginUser = async (req, res) => {
    const {
        username,
        password,
    } = req.body
}

module.exports = {
    registerUser,
};






//const registerUser = async (req, res) => {

//    try { 
//        const username = req.body.username
//        const email = req.body.email
//        const password = await bcrypt.hash(req.body.password, 10)

//        const newUser = new User({ 
//                username,
//                email, 
//                password
//        })

//        await newUser.save()
//        console.log(req.body)

//        res.redirect('/login')
//    } catch (error) {
//        console.error('Error adding user:', error)

//    }
//}



//module.exports = {registerUser}

