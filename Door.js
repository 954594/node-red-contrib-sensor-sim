module.exports = function(red) {
  function Door(config) {
    red.nodes.createNode(this,config);
    var node = this;

    try {
      node.on('input', function(msg) {
           let Options = new Object();
           Options.OriginalID = config.OriginalID;
           Options.Status = config.Status;

           const date = new Date();

           var array = ["08", "09"];
           var state = array[Math.floor(Math.random() * array.length)];

           var Data1 = state;

           if( Options.Status != "00" ){
               Data1 = Options.Status;
           }

           msg.payload = {
               "Time": date.toString(),
               "OriginalID":Options.OriginalID,
               "EEP": "1BS",
               "Data1":Data1,
               "Data4":"00000000",
               "SubTelNum":[1],
               "dBm":[50]
           };
        node.send(msg);
      });
    } catch(e) {
      node.error(e)
    }
  }
  red.nodes.registerType("Door",Door);
};