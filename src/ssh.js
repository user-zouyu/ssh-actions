const {NodeSSH} = require('node-ssh')

async function exec(config) {
    const ssh = new NodeSSH();
    const res = await ssh.connect({
        ...config
    }).then(async client => {
        return await client.execCommand(config.script)
    })

    ssh.dispose()
    return res
}

module.exports = exec