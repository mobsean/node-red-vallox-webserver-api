module.exports = function (RED) {
  function valloxApiConfigNode (n) {
    RED.nodes.createNode(this, n)
    this.ip = n.ip
  }
  RED.nodes.registerType('valloxApi', valloxApiConfigNode)
}
