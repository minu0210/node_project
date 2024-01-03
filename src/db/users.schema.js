const { model, Schema } = require('mongoose')

const userSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    }
})

module.exports = model('User', userSchema)