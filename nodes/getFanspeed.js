module.exports = function (RED) {
  function getFanspeedNode(config) {
    RED.nodes.createNode(this, config)
    const node = this

    const Vallox = require('@danielbayerlein/vallox-api')
    const { ip } = RED.nodes.getNode(config.ip)
    const client = new Vallox({ ip, port: 80 })

    node.on('input', async (msg, send, done) => {
      try {
        const metrics = await client.fetchMetrics([
          'A_CYC_FAN_SPEED',
          'A_CYC_EXTR_FAN_SPEED'
        ])
        const parsedMetrics = {}
        Object.keys(metrics).forEach((key) => {
          parsedMetrics[key] = parseFloat(metrics[key])
        })

        const msg1 = {
          payload: parsedMetrics.A_CYC_FAN_SPEED,
          unit: '%',
          name: 'A_CYC_FAN_SPEED'
        }

        const msg2 = {
          payload: parsedMetrics.A_CYC_EXTR_FAN_SPEED,
          unit: 'rpm',
          name: 'A_CYC_EXTR_FAN_SPEED'
        }

        node.send([msg1, msg2])

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
  RED.nodes.registerType('getFanspeed', getFanspeedNode)
}
