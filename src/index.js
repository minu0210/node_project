const _ = require('lodash')
const express = require('express')
const app = express()

const signupRoute = require('./server/routes/signup')
const signinRoute = require('./server/routes/signin')

const dbConnect = require('./db/connect')
const User = require('./db/users.schema')
const encryptPassword = require('./lib/encryptPassword')
const initExpressApp = require('./server/initExpressApp')

console.log('DB 접속 시도')
dbConnect()
console.log('DB 접속 완료')

initExpressApp(app)

const routes = [
    signupRoute,
    signinRoute
]

routes.forEach(route => {
    app[route.method](route.path, route.handler)
})

app.get('/users', (req, res) => {
    return res.json(users)
})

app.get('/users/me', (req, res) => {
    const { idx } = req.session

    const me = users.find(user => {
        return user.idx === idx
    })

    return res.json(me)
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
