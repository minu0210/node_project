const _ = require('lodash')
const Post = require('@db/posts.schema')

module.exports = {
    path: '/posts',
    method: 'post',
    handler: async (req, res) => {
        const { _id } = req.session

        if (_id === undefined) {
            throw new Error('401:로그인을 해주세요.')
        }
        
        const post = _.pick(req.body, ['title', 'content'])
        await Post.create({ ...post, author: _id }) // Object.assign() 문법으로 처리한 것과 유사

        return res.redirect('/')
    }
}