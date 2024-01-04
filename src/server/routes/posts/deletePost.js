const { Types: { ObjectId } } = require('mongoose')
const _ = require('lodash')
const Post = require('@db/posts.schema')

module.exports = {
    path: '/posts/:postId',
    method: 'delete',
    handler: async (req, res) => {
        const { postId: _id } = req.params

        await Post.deleteOne({ _id: new ObjectId(_id) })

        return res.redirect('/')
    }
}