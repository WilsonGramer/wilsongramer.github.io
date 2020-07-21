'use strict'

const express = require('express')
const loadComponents = require('./components')
const makeRender = require('./render')
const loadPosts = require('./posts')

;(async () => {
    const components = await loadComponents()
    const render = makeRender(components)

    const { posts, sortedPostList } = await loadPosts()

    const app = express()
    app.use(express.static('public'))

    const renderHandler = (page, view = {}) => async (req, res) => {
        const html = await render(page, view)
        res.contentType('html')
        res.send(html)
    }

    app.get('/', renderHandler('home', {
        title: 'Wilson Gramer’s Portfolio',
    }))

    app.get('/blog', renderHandler('blog', {
        posts: sortedPostList,
        title: 'Wilson Gramer’s Blog',
    }))

    app.get('/blog/:id', async (req, res) => {
        const { id } = req.params
        const post = posts[id]

        if (!post) {
            res.redirect('/404')
            return
        }

        renderHandler('post', {
            post,
            title: `${post.title} — Wilson Gramer’s Blog`,
        })(req, res)
    })

    app.get('*', renderHandler('404', {
        title: 'Page Not Found',
    }))

    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}`)
    })
})()
