const mongoose = require('mongoose')

const id = 'minu'
const password = 'g3ngC4ZcL2UoxxbF'
const connectionString = `mongodb+srv://${id}:${password}@cluster0.0nv4uhe.mongodb.net/?retryWrites=true&w=majority`

module.exports = async function () {
    await mongoose.connect(connectionString)
    console.log('Connected!')
}