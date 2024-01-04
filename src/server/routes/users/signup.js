const _ = require('lodash')
const User = require('@db/users.schema')
const encryptPassword = require('@lib/encryptPassword')
const checkDuplicatedId = require('@lib/checkDuplicatedId')

module.exports = {
    path: '/signup',
    method: 'post',
    handler: async (req, res) => {
        const user = _.pick(
            req.body,
            [
                'id',
                'password', 
                'name',
                'age'
            ]
        )

        if (await checkDuplicatedId(req.body.id)) {
            throw new Error('400:아이디가 중복됩니다.')
        }

        await User.create(
            Object.assign(
                user, 
                { password: encryptPassword(user.password) }
            )
        )

        return res.json({ success: true })
    }
}