const functions = require("firebase-functions");
const https = require("https");

const admin = require("firebase-admin");
admin.initializeApp();

exports.genericSonosRequest = functions.region('europe-west2').https.onCall((data, context) => {
  const url = data.url;
  const body = data.body || undefined;
  const accessToken = data.accessToken;
  const method = data.method;
  const options = {
    hostname: "api.ws.sonos.com",
    port: 443,
    path: encodeURI(url),
    method: method.toUpperCase(),
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + accessToken,
    },
  };
  return doRequest(options, body);
});

exports.getAccessToken = functions.region('europe-west2').https.onCall((data, context) => {
  const url = data.url;
  const body = new URLSearchParams(data.body).toString();
  const options = {
    hostname: "api.sonos.com",
    port: 443,
    path: url,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic " + Buffer.from(`${process.env.SONOS_ACCESS_KEY}` + ":" + `${process.env.SONOS_SECRET_KEY}`).toString("base64"),
      "Content-Length": Buffer.byteLength(body),
    },
  };
  return doRequest(options, body);
});

/**
 * This is a generic doRequest function
 * @param {object} options - options
 * @param {object} data - data
 * @returns
 */
function doRequest(options, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      res.setEncoding("utf8");
      let responseBody = "";

      res.on("data", (chunk) => {
        responseBody += chunk;
      });

      res.on("end", () => {
        resolve(JSON.parse(responseBody));
      });
    });

    req.on("error", (err) => {
      console.error('An error occurred: ', err);
      reject(err);
    });

    if (data != undefined) {
      req.write(data);
    }
    req.end();
  });
}
