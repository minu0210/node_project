const { model, Schema } = require('mongoose')

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    view: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
})

module.exports = model('Post', postSchema)