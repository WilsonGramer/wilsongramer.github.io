'use strict'

const fs = require('fs-extra')
const path = require('path')
const markdown = require('markdown-it')
const frontMatter = require('yaml-front-matter')

const md = markdown()
    .use(require('markdown-it-highlightjs'))

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

    const sortedPostList = Object.values(posts).sort((a, b) => a.pubDate - b.pubDate)

    return { posts, sortedPostList }
}

module.exports = loadPosts
