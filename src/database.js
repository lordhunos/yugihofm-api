const mongoose = require('mongoose')

const authSource = process.env.DB_AUTH_SOURCE
const user = process.env.DB_USER
const pass = process.env.DB_PASS
const protocol = process.env.DB_PROTOCOL
const dbHost = process.env.DB_HOST
const dbPort = process.env.DB_PORT
const dbName = process.env.DB_NAME
const mongoURI = protocol+'://'+dbHost+':'+dbPort+'/'+dbName
console.log(mongoURI)

const dbConfig = {
    authSource,
    user,
    pass,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
}

mongoose.connection.on('connected', () => {
    console.log('Connection Established')
})

mongoose.connection.on('reconnected', () => {
    console.log('Connection Reestablished')
})

mongoose.connection.on('disconnected', () => {
    console.log('Connection Lost')
})

mongoose.connection.on('close', () => {
    console.log('Connection Closed')
})

const dbConnect = async () => {
    try{
        await mongoose.connect(mongoURI, dbConfig)
    } catch (e) { 
        console.log('ERROR: ' + e)
    }
}

module.exports = dbConnect
