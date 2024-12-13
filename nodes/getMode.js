module.exports = function (RED) {
  function getModeNode (config) {
    RED.nodes.createNode(this, config)
    const node = this

    const Vallox = require('@danielbayerlein/vallox-api')
    const { ip, modes } = RED.nodes.getNode(config.ip)
    const client = new Vallox({ ip, port: 80 })

    node.on('input', async (msg, send, done) => {
      try {
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
  RED.nodes.registerType('getMode', getModeNode)
}
