module.exports = function (RED) {
  function getProfileNone (config) {
    RED.nodes.createNode(this, config)
    const node = this

    const Vallox = require('@danielbayerlein/vallox-api')
    const { ip } = RED.nodes.getNode(config.ip)
    const client = new Vallox({ ip, port: 80 })

    node.on('input', async (msg, send, done) => {
      try {
        const profiles = client.PROFILES
        const result = await client.getProfile()
        const profile = Object.keys(profiles).find(key => profiles[key] === result)

        node.send({ payload: profile })

        node.status({ fill: 'green', shape: 'dot', text: 'connected' })
        if (done) {
          done()
        }
      } catch (err) {
        node.error(err, msg)
        node.status({ fill: 'red', shape: 'ring', text: 'error: open debug' })
        done(err)
      }
    })
  }
  RED.nodes.registerType('getProfile', getProfileNone)
}
