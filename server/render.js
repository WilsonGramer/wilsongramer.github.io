'use strict'

const fs = require('fs-extra')
const path = require('path')
const mustache = require('mustache')

const makeRender = (components) => async (pageName, view = {}) => {
    const newView = { pageName, ...view }

    const template = (await fs.readFile(path.join('./templates', `${pageName}.html`))).toString()
    const withComponents = mustache.render(template, { components, ...newView })
    return mustache.render(withComponents, newView)
}

module.exports = makeRender
