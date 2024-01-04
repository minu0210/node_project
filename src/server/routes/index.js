const fs = require('fs')
const path = require('path')

const routes = []

function collectRoutes (targetDir = './src/server/routes') {
    const dirs = fs.readdirSync(targetDir)
    dirs.forEach(dir => {
        if (dir === 'index.js') return

        const subTargetDir = path.join(targetDir, dir)

        if (fs.lstatSync(subTargetDir).isDirectory()) {
            collectRoutes(subTargetDir)
        } else {
            routes.push(require(path.join(__dirname, '../../../', subTargetDir)))
        }
    })
}

collectRoutes()

module.exports = routes