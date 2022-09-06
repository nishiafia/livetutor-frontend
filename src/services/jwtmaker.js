const crypto = require("crypto");

export default function (payload_params) {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };
  const timestamp = Date.now();
  const payload = {
    ...payload_params,
    aud: "3C68F1C9B375C34C2FB4D3CF86205254",
    iss: "3C68F1C9B375C34C2FB4D3CF86205254",
    iat: Math.floor(timestamp / 1000),
    nbf: 2000,
    exp: Math.floor((timestamp + 1000 * 60 * 60 * 3) / 1000),
  };
  const _header = Buffer.from(JSON.stringify(header))
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  const _payload = Buffer.from(JSON.stringify(payload))
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  const signature = _header + "." + _payload;
  const secret = "FB13E8E76E8BA8ECEE6CFB955B40D472";
  const _signature = crypto
    .createHmac("sha256", secret)
    .update(signature)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return signature + "." + _signature;
}
