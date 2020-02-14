//Load environment
require('dotenv').config()

//Load database
const database = require('./database')

//Node modules
const path = require('path')
const morgan = require('morgan')
const express = require('express')
const fs = require('fs')
const https = require('https')

//Router files (to implement an index)
const userRoutes = require('./routes/user')
const authRoutes = require('./routes/auth')
const cardRoutes = require('./routes/card')
const rivalRoutes = require('./routes/rival')
const fusionRoutes = require('./routes/fusion')
const deckRoutes = require('./routes/deck')
const dropRoutes = require('./routes/drop')
const equipmentRoutes = require('./routes/equipment')
const ritualRoutes = require('./routes/ritual')

const passport = require('./authenticators/strategies')

//Start Database
database()

const app = express()
app.set('http_port', process.env.HTTP_PORT || 4000)
app.set('https_port', process.env.HTTPS_PORT || 8000)

const key = fs.readFileSync(process.env.SERVER_KEY)
const cert = fs.readFileSync(process.env.SERVER_CERT)

//Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())

//Server Routes
app.use('/api', [cardRoutes, rivalRoutes, fusionRoutes, deckRoutes, dropRoutes, equipmentRoutes, ritualRoutes])
app.use('/user', userRoutes)
app.use('/auth', authRoutes)

// const { ensureAuthorization, ensureAdminPrivileges } = require('./utils/middlewares')
// app.get('/admin', 
//     ensureAuthorization,
//     passport.authenticate('jwt-get', { session: false }),
//     ensureAdminPrivileges,
//     (req, res) => {
//         res.send('Admin')
//     }
// )

//HTTPS Server Start
https.createServer( { key, cert }, app )
.listen(app.get('https_port'), () => {
    console.log('Server on https://localhost:'+app.get('https_port'))
})
//HTTP Server Start
app.listen(app.get('http_port'), () => {
    console.log('Server on http://localhost:'+app.get('http_port'))
})