module.exports = function (RED) {
  function setProfileNode (config) {
    RED.nodes.createNode(this, config)
    const node = this

    const Vallox = require('@danielbayerlein/vallox-api')
    const { ip } = RED.nodes.getNode(config.ip)
    const client = new Vallox({ ip, port: 80 })
    const profiles = client.PROFILES

    node.on('input', async (msg, send, done) => {
      try {
        if (config.profile === 'default') {
          await client.setProfile(profiles[msg.payload.toUpperCase()])
        } else {
          await client.setProfile(profiles[config.profile])
        }

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
  RED.nodes.registerType('setProfile', setProfileNode)
}
