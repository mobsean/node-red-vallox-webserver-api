module.exports = function (RED) {
  function setModeNode (config) {
    RED.nodes.createNode(this, config)
    const node = this

    const Vallox = require('@danielbayerlein/vallox-api')
    const { ip, modes } = RED.nodes.getNode(config.ip)
    const client = new Vallox({ ip, port: 80 })

    node.on('input', async (msg, send, done) => {
      try {
        if (config.mode === 'default') {
          await client.setValues({A_CYC_MODE: modes[msg.payload.toUpperCase()]});
        } else {
          await client.setValues({A_CYC_MODE: modes[config.mode]});
        }

        const result = await client.fetchMetrics(['A_CYC_MODE'])
        const mode = Object.keys(modes).find(key => modes[key] === result.A_CYC_MODE);
        node.send({ payload: mode });

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
  RED.nodes.registerType('setMode', setModeNode)
}
