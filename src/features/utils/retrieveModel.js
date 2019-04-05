process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const https = require('https');
const fs = require('fs');
const BASE_URL = "aa";
const RETRIEVE_MODEL_URL = "aa";
let itemId = "aa";
let snapshotId = "aa";
let branchId = "aa";
let processAppID = "aa";


let url = BASE_URL + RETRIEVE_MODEL_URL + itemId + "?snapshotId=" + snapshotId + "&branchId=" + branchId + "&processAppId=" + processAppID + "&parts=dataModel";

let user = new Buffer.from('XXX').toString('base64');
let pass = new Buffer.from('YYY').toString('base64');

var options = {
    auth: 'BPM_REST:4=fc%w@3=9Kpy5BhpC3u=uSN4hsA7B%AKjrNfruo'
}

https.get(url, options, (res) => {
    console.log('statusCode:', res.statusCode);
    let body = "";
    res.on('data', (d) => {
        body += d;
      });
    res.on('end', () => {
        fs.writeFileSync("dataModel.json", JSON.stringify(JSON.parse(body).data.DataModel.validation, 2, 2));  
    })
})