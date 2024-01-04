const _ = require('lodash')
const express = require('express')
const moduleAlias = require('module-alias')

moduleAlias.addAliases({
    '@root': __dirname,
    '@db': __dirname + '/db',
    '@routes': __dirname + '/server/routes',
    '@lib': __dirname + '/lib',
    '@server': __dirname + '/server'
})

const routes = require('@routes')

const dbConnect = require('@db/connect')
const initExpressApp = require('@server/initExpressApp')

async function bootstrap () {
    const app = express()

    console.log('DB 접속 시도')
    await dbConnect()
    console.log('DB 접속 완료')

    initExpressApp(app)
    
    routes.forEach(route => {
        app[route.method](route.path, (req, res) => {
            route.handler(req, res)
                .catch((err) => {
                    console.error('Api Error:', err)

                    const [statusCode, errorMessage] = err.message.split(':')
                    
                    return res
                        .status(statusCode)
                        .json({
                            success: false,
                            message: errorMessage
                    })
                })
        })
    })

    const port = 3000
    app.listen(port, () => {
        console.log(`App is running on port: ${port}`)
    })
}
bootstrap() // 최상단에 있어 async를 감싸줄 수 없기 때문에 이러한 방식으로 작성
    .catch(err => {
        console.error('Error is occured while running application. Error:', err)
    })