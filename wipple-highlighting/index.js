const { execSync } = require('child_process')

const highlightWipple = (code) => {
    const output = execSync(`/usr/local/opt/python@3.8/bin/python3 ${__dirname}`, { input: code })
    return output.toString('utf8')
}

module.exports = highlightWipple
