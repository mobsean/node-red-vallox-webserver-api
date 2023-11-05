module.exports = function (RED) {
  function getTempNode (config) {
    RED.nodes.createNode(this, config)
    const node = this

    const Vallox = require('@danielbayerlein/vallox-api')
    const { ip } = RED.nodes.getNode(config.ip)
    const client = new Vallox({ ip, port: 80 })

    node.on('input', async (msg, send, done) => {
      try {
        const metrics = await client.fetchMetrics([
          'A_CYC_TEMP_SUPPLY_AIR', // Zuluft
          'A_CYC_TEMP_SUPPLY_CELL_AIR', // Zuluft_vom_Wärmetauscher
          'A_CYC_TEMP_EXHAUST_AIR', // Fortluft
          'A_CYC_TEMP_OUTDOOR_AIR', // Außenluft
          'A_CYC_TEMP_EXTRACT_AIR' // Abluft
        ])
        const parsedMetrics = {}
        Object.keys(metrics).forEach((key) => {
          parsedMetrics[key] = parseFloat(metrics[key])
        })

        const msg1 = {
          payload: parsedMetrics.A_CYC_TEMP_SUPPLY_AIR,
          temperatureUnit: '° C',
          name: 'A_CYC_TEMP_SUPPLY_AIR / Zuluft'
        }
        const msg2 = {
          payload: parsedMetrics.A_CYC_TEMP_SUPPLY_CELL_AIR,
          temperatureUnit: '° C',
          name: 'A_CYC_TEMP_SUPPLY_CELL_AIR / Zuluft vom Wärmetauscher'
        }
        const msg3 = {
          payload: parsedMetrics.A_CYC_TEMP_EXHAUST_AIR,
          temperatureUnit: '° C',
          name: 'A_CYC_TEMP_EXHAUST_AIR / Fortluft'
        }
        const msg4 = {
          payload: parsedMetrics.A_CYC_TEMP_OUTDOOR_AIR,
          temperatureUnit: '° C',
          name: 'A_CYC_TEMP_OUTDOOR_AIR / Außenluft'
        }
        const msg5 = {
          payload: parsedMetrics.A_CYC_TEMP_EXTRACT_AIR,
          temperatureUnit: '° C',
          name: 'A_CYC_TEMP_EXTRACT_AIR / Abluft'
        }

        node.send([msg1, msg2, msg3, msg4, msg5])

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
  RED.nodes.registerType('getTemp', getTempNode)
}
