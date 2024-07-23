const express = require('express');
const crypto = require('crypto');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());

app.use(express.json());

const AES_KEY = crypto.randomBytes(32);
const AES_IV = crypto.randomBytes(16);

const { generateKeyPairSync, publicEncrypt, privateDecrypt } = crypto;
const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
});

app.post('/encrypt/symetric', (req, res) => {
    const { plaintext } = req.body;

    const cipher = crypto.createCipheriv('aes-256-cbc', AES_KEY, AES_IV);
    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    res.json({ ciphertext: encrypted, iv: AES_IV.toString('hex') });
});

app.post('/decrypt/symetric', (req, res) => {
    const { ciphertext, iv } = req.body;

    const decipher = crypto.createDecipheriv('aes-256-cbc', AES_KEY, Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(ciphertext, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    res.json({ plaintext: decrypted });
});

app.post('/encrypt/asymetric', (req, res) => {
    const { plaintext } = req.body;

    const encrypted = publicEncrypt(publicKey, Buffer.from(plaintext)).toString('hex');

    res.json({ ciphertext: encrypted });
});

app.post('/decrypt/asymetric', (req, res) => {
    const { ciphertext } = req.body;

    const decrypted = privateDecrypt(privateKey, Buffer.from(ciphertext, 'hex')).toString('utf8');

    res.json({ plaintext: decrypted });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});