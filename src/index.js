//Load environment
require('dotenv').config()

//Load database
const database = require('./database')

//Node modules
const path = require('path')
const morgan = require('morgan')
const express = require('express')

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
//Express variables
app.set('port', process.env.PORT || 3000)

//Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())

//Server Routes
app.use('/api', [cardRoutes, rivalRoutes, fusionRoutes, deckRoutes, dropRoutes, equipmentRoutes, ritualRoutes])
app.use('/user', userRoutes)
app.use('/auth', authRoutes)

//Server Start
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})