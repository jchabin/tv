// I use this script everywhere. Just hosts http server on port 80 to serve
// static webpage content. I also usually use it as a starting point to add
// actual server logic into later, if needed.

const express = require("express");
const os = require("os");

var LAN_ADDRESS = "ERROR";
var netInt = os.networkInterfaces();
ip: for(n in netInt){
  for(var i = 0; i < netInt[n].length; i++){
    if(netInt[n][i].family == "IPv4" && !netInt[n][i].internal){
      LAN_ADDRESS = netInt[n][i].address;
      console.log(LAN_ADDRESS);
      // break ip;
    }
  }
}

const app = express();
app.use(express.static(__dirname));

app.listen(80);
