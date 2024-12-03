module.exports = function (RED) {
  function valloxApiConfigNode (n) {
    RED.nodes.createNode(this, n)
    this.ip = n.ip
    this.modes = {
      NORMAL: 0,
      //TESTING: 1,
      //MANUAL: 2,
      //DEFROST: 3,
      //SELF_TEST: 4,
      //EMC_TEST: 6,
      OFF: 5
    };
  }
  RED.nodes.registerType('valloxApi', valloxApiConfigNode)
}
