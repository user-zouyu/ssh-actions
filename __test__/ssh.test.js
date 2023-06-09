const exec = require('../src/ssh')
const {test} = require('@jest/globals')

test("ssh test", async () => {
    const res = await exec({
        host: "124.222.167.219",
        port: 22,
        username: "ubuntu",
        password: "@ZouYu999",
        script: `
        ls -al
        pwd
        docker ps
        `
    })

    console.log(res)
})