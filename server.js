const express = require("express");
const os = require("os");
const { Readable } = require("stream");

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

app.get("/vproxy", (req, res) => {
  fetch(req.query.url, {redirect: "manual"}).then(r => {
    const forwardHeaders = new Headers(r.headers);
    forwardHeaders.delete("content-length");
    forwardHeaders.delete("content-encoding");
    if(forwardHeaders.get("location")) {
      const location = forwardHeaders.get("location").match(/^https?:\/\//) ?
        forwardHeaders.get("location") :
        r.url.match(/^https?:\/\/[^\/]+/)[0] + forwardHeaders.get("location");
      forwardHeaders.set("location", "http://localhost/vproxy?url=" + encodeURIComponent(location));
    }
    res.setHeaders(forwardHeaders);
    res.status(r.status);
    Readable.fromWeb(r.body).pipe(res);
  }).catch(e => {
    res.sendStatus(400);
  });
});

app.listen(80);
