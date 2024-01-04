const User = require("@db/users.schema")

module.exports = {
    path: '/users/me',
    method: 'get',
    handler: async (req, res) => {
        const { _id } = req.session
    
        const me = await User.findOne({ _id })
    
        if (me === null) {
            throw new Error('403:로그인을 해주세요.')
        }

        return res.json(me)
    }
}