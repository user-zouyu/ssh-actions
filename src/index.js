const core = require("@actions/core")
// const exec = require("ssh")
const {NodeSSH} = require("node-ssh");

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

async function run() {
    const username = core.getInput("username")
    const password = core.getInput("password")
    const host = core.getInput("host")
    const port = parseInt(core.getInput("port"))
    const script = core.getInput("script")

    try {
        const res = await exec({
            username,
            password,
            host,
            port,
            script
        })
        if(res.code === 0) {
            core.info("code: " + res.code)
            core.info(res.stdout)
            core.setOutput("log", res.stdout)
        } else {
            core.info("code: " + res.code)
            core.info("stdout: "  + res.stdout)
            core.info("stderr: " + res.stderr)
            core.setFailed(res.stderr)
        }
    } catch (err) {
        core.error(err)
        core.setFailed(err)
    }
}


run().then(() => {
    core.info("run over")
})