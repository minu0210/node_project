const { Types: { ObjectId } } = require('mongoose')
const Post = require('@db/posts.schema')
const User = require('@db/users.schema')

module.exports = {
    path: '/posts',
    method: 'get',
    handler: async (req, res) => {
        let posts = await Post.find()

        posts = await Promise.all(
            posts.map(async post => {
                const user = await User.findOne({ _id: new ObjectId(post.author) })

                let authorName = '삭제된 유저'
                if (user !== null) {
                    authorName = user.name
                }

                return { ...post.toJSON(), authorName }
            })
        )
        
        return res.json(posts)
    }
}