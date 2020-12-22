module.exports = function(red) {
  function Illumi(config) {
    red.nodes.createNode(this,config);
    var node = this;

    try {
      node.on('input', function(msg) {
           let Options        = new Object();
           Options.OriginalID = config.OriginalID;
           Options.Svc        = config.Svc;
           Options.Illumi1    = config.Illumi1;
           Options.Illumi2    = config.Illumi2;

           const date = new Date();

           const svc_data_min = 0;
           const svc_data_max = 255;
           const svc_min  = 0;
           const svc_max  = 5.1;
           var svc      = Math.random() * (svc_max - svc_min + 1.00) + svc_min; 

           if( Options.Svc != "9" ){
               svc = Number(Options.Svc);
           }

           var svc_data = Math.floor(svc/(svc_max-svc_min) *
                           (svc_data_max-svc_data_min));

           const ill1_data_min = 0;
           const ill1_data_max = 255;
           const ill1_min  = 0;
           const ill1_max  = 510;

           var ill1      = Math.random() * (ill1_max - ill1_min + 1.00) + ill1_min; 

           if( Options.Illumi1 != "9999" ){
               ill1 = Number(Options.Illumi1);
           }

           var ill1_data = Math.floor(ill1 / (ill1_max - ill1_min) *
                           (ill1_data_max - ill1_data_min));

           const ill2_data_min = 0;
           const ill2_data_max = 255;
           const ill2_min  = 0;
           const ill2_max  = 1020;

           var ill2      = Math.random() * (ill2_max - ill2_min + 1.00) + ill2_min;

           if( Options.Illumi2 != "9999" ){
               ill2 = Number(Options.Illumi2);
           }

           var ill2_data = Math.floor(ill2 / (ill2_max - ill2_min) *
                           (ill2_data_max - ill2_data_min));

           var Data4 = ('00' + svc_data.toString(16)).slice( -2 ) +
                       ('00' + ill1_data.toString(16)).slice( -2 ) +
                       ('00' + ill2_data.toString(16)).slice( -2 ) +
                       "08"

           msg.payload = {
               "Time":date.toString(),
               "OriginalID":Options.OriginalID,
               "EEP":"4BS",
               "Data1":"00",
               "Data4":Data4,
               "SubTelNum":[1],
               "dBm":[45]
           };
        node.send(msg);
      });
    } catch(e) {
      node.error(e)
    }
  }
  red.nodes.registerType("Illumi",Illumi);
};