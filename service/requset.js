import fs from 'fs';
import NodeRSA from 'node-rsa';
import request from 'request';
import { randomString, stringify,sign} from '../utils/utils';
const BASE64 = 'base64';
const UTF8 = 'utf8'
const pkcsSize = 2048;
const pkcsType = 'pkcs1';
const appid = 'appid';
const domain = 'url地址';
// const domain = 'https://www.baidu.com'
export function ajax(url, data, success, fail) {

    let params = {
        ...data,
        appid, // APPID
        noncestr: randomString(14), // 14位长度随机字符串，任意方式生成都可以
        timestamp: new Date().getTime()  // 当前时间戳
    };
    const stringifyParams = stringify(params); // 进行一次qs拼接
    console.log('stringifyParams', stringifyParams)
    // /* sha256 签名 */
    // const sign = crypto.createSign('SHA256');
    // sign.write(stringifyParams);
    // sign.end();
    // const privateKey = fs.readFileSync('rsa_private.pem');
    // console.log('privateKey', privateKey);
    // const signature_b64 = sign.sign(privateKey, 'base64'); // 签名
    // // console.log("signature_b64\n",signature_b64)
    // params.sign = signature_b64; // 添加到params
    /* sha256 签名 */
    const privateKey = fs.readFileSync('rsa_private_key.pem');
    console.log("privateKey", privateKey);
    // const signature_b64 = sign.sign(privateKey, 'base64'); // 签名
    const rsa = new NodeRSA(privateKey, pkcsType + '-private');
    // rsa.importKey(privateKey,pkcsType+'-private-pem');
    // const signature_b64 = crypto2.sign.sha256(stringifyParams, privateKey); // 签名
    const signature_b64 = rsa.sign(Buffer.from(stringifyParams), BASE64).toString(BASE64);
    console.log('signature_b64', signature_b64)
    params.sign = signature_b64; // 添加到params
    const raw = JSON.stringify(params); // JSON.stringify一下最后要post的内容
    console.log('prarr', params)
    request({
        url: `${domain}${url}`,
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: raw
    },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // console.log('body', body);
                try {
                    success(JSON.parse(body));
                } catch (error) {
                    success(body);
                }

            }else{
                fail(response);
            }
        })
}
// ajax('/api/provider/card_validate', {
//     mobile: '18782974020',
//     card_no: 'HT1000019A',
//     card_pwd: 'CU2GTHTB'
// })