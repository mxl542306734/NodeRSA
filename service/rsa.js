const fs = require('fs');
const privKey = fs.readFileSync('../private_key.pem','utf8');
const pubKey = fs.readFileSync('../public_key.pem','utf8');
const pkcsType = 'pcks8';
const NodeRSA = require('node-rsa');
const BASE64='base64';
const pkcsSize = 1024;
const UTF8 = 'utf8'
function encrypt(data){
    const key = new NodeRSA(privKey);
    key.setOptions({encryptionScheme: 'pkcs1'})
    // key.importKey(privKey);
    return key.encryptPrivate(data,BASE64);
}
function decrypt(data){
    const key = new NodeRSA(pubKey);
    // key.importKey(pubKey);
    key.setOptions({encryptionScheme: 'pkcs1'})

    return key.decryptPublic(data,BASE64);
}
console.log('privKey',privKey,'pubKey',pubKey);
function sign (data){
    const key = new NodeRSA(privKey);
    key.setOptions({encryptionScheme: 'pkcs1'})

    return key.sign(Buffer.from(data),BASE64).toString(BASE64);
}

console.log('加密',encrypt('sdassdsds'),"解密",decrypt(encrypt('sdassdsds')),"勤按摩",sign("舒适度上的"))