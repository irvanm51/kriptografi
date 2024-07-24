const apiUrl = 'http://localhost:3000';

async function encryptAES() {
    const plaintext = document.getElementById('plainText-aes').value;
    try {
        const response = await fetch(`${apiUrl}/encrypt/symetric`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({plaintext}),
        });
        const result = await response.json();
        document.getElementById('result-encrypt-aes').textContent = result.ciphertext;
        document.getElementById('aesIv').value = result.iv;
    } catch (error) {
        console.error('Error encrypting AES:', error);
    }
}

async function decryptAES() {
    const ciphertext = document.getElementById('cipherText-aes').value;
    const iv = document.getElementById('aesIv').value;
    try {
        const response = await fetch(`${apiUrl}/decrypt/symetric`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ciphertext, iv}),
        });
        const result = await response.json();
        document.getElementById('result-decrypt-aes').textContent = result.plaintext;
    } catch (error) {
        console.error('Error decrypting AES:', error);
    }
}

async function encryptRSA() {
    const plaintext = document.getElementById('plainText-rsa').value;
    try {
        const response = await fetch(`${apiUrl}/encrypt/asymetric`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({plaintext}),
        });
        const result = await response.json();
        document.getElementById('result-encrypt-rsa').textContent = result.ciphertext;
    } catch (error) {
        console.error('Error encrypting RSA:', error);
    }
}

async function decryptRSA() {
    const ciphertext = document.getElementById('cipherText-rsa').value;
    try {
        const response = await fetch(`${apiUrl}/decrypt/asymetric`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ciphertext}),
        });
        const result = await response.json();
        document.getElementById('result-decrypt-rsa').textContent = result.plaintext;
    } catch (error) {
        console.error('Error decrypting RSA:', error);
    }
}