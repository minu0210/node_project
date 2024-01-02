const _ = require('lodash')
const { v4: uuidv4 } = require('uuid')
const crypto = require('crypto')
const express = require('express')
const app = express()

app.use(express.json())

function encryptPassword(password) {
    return crypto
        .createHash('sha256')
        .update(password + 'QQ4d$4#()$(&^_$^')
        .digest('base64')
}

let users = [{
    idx: uuidv4(),
    id: 'digitech1',
    password: encryptPassword('thisispassword'),
    name: '홍길동',
    gender: 'male',
    age: 21,
    phoneNumber: '010-0000-0000'
}]

app.get('/users', (req, res) => {
    return res.json(users)
})

app.post('/signup', (req, res) => {
    const user = _.pick(
        req.body,
        [
            'id',
            'password', 
            'name', 
            'gender', 
            'age', 
            'phoneNumber'
        ]
    )
    
    users.push(Object.assign(user, { idx: uuidv4() }))

    return res.json({ success: true })
})

app.patch('/users/:userId', (req, res) => {
    const { userId } = req.params
    const body = req.body
    
    // for (let i = 0; i < users.length; i++) {
    //     if (users[i].id === userId) {
    //         if (req.body.name !== undefined) {
    //             users[i].name = req.body.name
    //         }
    //     }
    // }

    // for (let i = 0; i < users.length; i++) {
    //     if (users[i].id === userId) {   
    //         const newUser = _.pick(req.body, ['name', 'age', 'gender', 'phoneNumber'])
    //         Object.assign(users[i], newUser)
    //     }
    // }

    const userIndex = users.findIndex((user) => {
        return user.idx === userId
    })

    const newUser = _.pick(req.body, ['id', 'password', 'name', 'age', 'gender', 'phoneNumber'])

    if (newUser.password !== undefined) {
        newUser.password = encryptPassword(newUser.password)
    }

    Object.assign(users[userIndex], newUser)

    return res.json({ success: true })
})

app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params
    
    const filterFunc = (user) => {
        if (user.idx !== userId) return true
        return false
    }

    users = users.filter(filterFunc)

    return res.json({ success: true })
})

const port = 3000
app.listen(port, () => {
    console.log(`App is running on port: ${port}`)
})
