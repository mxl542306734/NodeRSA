import fs from 'fs';
import NodeRSA from 'node-rsa';
import qs from 'querystring';
const BASE64 = 'base64';
const UTF8 = 'utf8'
const pkcsSize = 2048;
const pkcsType = 'pkcs1';
const appid = 'appid';
//生成随机字符串
export function randomString(n) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < n; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
//排序
export function sorted(o) {
    let p = Object.create(null);
    for (const k of Object.keys(o).sort()) p[k] = o[k];
    return p;
}
//对象排序然后生成key=value&key2=val2
export function stringify(params) {
    return qs.stringify(sorted(params), null, null, { encodeURIComponent: qs.unescape })
}
//签名
export function sign(data) {
    let params = {
        ...data,
        appid, // APPID
        noncestr: randomString(14), // 14位长度随机字符串，任意方式生成都可以
        timestamp: new Date().getTime()  // 当前时间戳
    };
    const stringifyParams = stringify(params); // 进行一次qs拼接
    const privateKey = fs.readFileSync('rsa_private_key.pem');
    const rsa = new NodeRSA(privateKey, pkcsType + '-private');
    const signature_b64 = rsa.sign(Buffer.from(stringifyParams), BASE64).toString(BASE64);
    params.sign = signature_b64; // 添加到params
    return JSON.stringify(params);
}