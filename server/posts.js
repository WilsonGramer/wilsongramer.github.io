'use strict'

const fs = require('fs-extra')
const path = require('path')
const markdown = require('markdown-it')
const frontMatter = require('yaml-front-matter')
const hljs = require('highlight.js')
const highlightWipple = require('../wipple-highlighting')

const md = markdown({
    typographer: true,
    html: true,
    linkify: true,
    highlight: (code, lang) => {
        if (!lang)
            return ''

        if (['wipple', 'wpl'].includes(lang))
            return highlightWipple(code)

        if (hljs.getLanguage(lang))
            return `<pre><code class="hljs">${hljs.highlight(lang, code).value}</code></pre>`

        return ''
    }
})

const loadPosts = async () => {
    const postsPath = './posts'
    const postFiles = await fs.readdir(postsPath)

    const posts = {}
    for (const postFilePath of postFiles) {
        const postFileName = path.parse(postFilePath).name
        const postFile = (await fs.readFile(path.join(postsPath, postFilePath))).toString()

        const post = frontMatter.safeLoadFront(postFile)
        const postHTML = md.render(post.__content)

        posts[postFileName] = {
            ...post,
            fileName: postFileName,
            content: postHTML,
        }
    }

    const sortedPostList = Object.values(posts)
        .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())

    return { posts, sortedPostList }
}

module.exports = loadPosts
