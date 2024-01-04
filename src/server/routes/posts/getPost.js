const { Types: { ObjectId } } = require('mongoose')
const Post = require('@db/posts.schema')

module.exports = {
    path: '/posts/:postId',
    method: 'get',
    handler: async (req, res) => {
        const { postId } = req.params
        // const post = await Post.findOne({ _id: new ObjectId(postId) })
        const post = await Post.findOneAndUpdate(
            { _id: new ObjectId(postId) },
            { $inc: { view: 1 } },
            { new: true }
        )
        return res.json(post)
    }
}