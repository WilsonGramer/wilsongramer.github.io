'use strict'

const fs = require('fs-extra')
const path = require('path')

const loadComponents = async () => {
    const componentsPath = './templates/components'
    const componentFiles = await fs.readdir(componentsPath)

    const components = {}
    for (const componentFilePath of componentFiles) {
        const componentFileName = path.parse(componentFilePath).name
        const componentFile = (await fs.readFile(path.join(componentsPath, componentFilePath))).toString()

        components[componentFileName] = componentFile
    }

    return components
}

module.exports = loadComponents
