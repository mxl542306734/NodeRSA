import fs from 'fs';
import NodeRSA from 'node-rsa';
import { randomString, stringify } from './utils';
const BASE64 = 'base64';
const UTF8 = 'utf8'
const pkcsSize = 2048;
const pkcsType = 'pkcs1';
const appid = 'appid';
export function sign(data){
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
}