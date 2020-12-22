module.exports = function(red) {
  function TmpHum(config) {
    red.nodes.createNode(this,config);
    var node = this;

    try {
      node.on('input', function(msg) {
           let Options = new Object();
           Options.OriginalID = config.OriginalID;
           Options.Tmp = config.Tmp;
           Options.Hum = config.Hum;

           const date = new Date();

           const tmp_data_min = 0;
           const tmp_data_max = 1023;
           const tmp_min  = 0;
           const tmp_max  = 60;

           var   tmp      = Math.random() * (tmp_max - tmp_min + 1.00) + tmp_min;

           if( Options.Tmp != "999" ){
               tmp = Number( Options.Tmp );
           }

           var   tmp_data = Math.floor(tmp/(tmp_max-tmp_min) *
                             (tmp_data_max-tmp_data_min));

           const hum_data_min = 0;
           const hum_data_max = 255;
           const hum_min = 0;
           const hum_max = 100;

           var hum       = Math.random() * (hum_max - hum_min + 1.00) + hum_min;

           if( Options.Hum != "999" ){
               hum = Number( Options.Hum );
           }

           var hum_data  = Math.floor(hum/(hum_max-hum_min) *
                                (hum_data_max-hum_data_min));

           var Data4 = ('00' + hum_data.toString(16)).slice( -2 ) +
                       ('0000' + tmp_data.toString(16)).slice( -4 ) + "08"

           msg.payload = {
               "Time":date.toString(),
               "OriginalID":Options.OriginalID,
               "EEP":"4BS",
               "Data1":"00",
               "Data4":Data4,
               "SubTelNum":[1],
               "dBm":[53]
           };
        node.send(msg);
      });
    } catch(e) {
      node.error(e)
    }
  }
  red.nodes.registerType("TmpHum",TmpHum);
};