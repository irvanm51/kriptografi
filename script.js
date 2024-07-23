const apiUrl = 'http://localhost:3000';

async function encryptAES() {
    const plaintext = document.getElementById('plainText').value;
    try {
        const response = await fetch(`${apiUrl}/encrypt/symetric`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({plaintext}),
        });
        const result = await response.json();
        document.getElementById('cipherText').textContent = result.ciphertext;
        document.getElementById('aesIv').value = result.iv;
    } catch (error) {
        console.error('Error encrypting AES:', error);
    }
}

async function decryptAES() {
    const ciphertext = document.getElementById('cipherText').value;
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
        document.getElementById('decryptedText').textContent = result.plaintext;
    } catch (error) {
        console.error('Error decrypting AES:', error);
    }
}

async function encryptRSA() {
    const plaintext = document.getElementById('plainTextRSA').value;
    try {
        const response = await fetch(`${apiUrl}/encrypt/asymetric`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({plaintext}),
        });
        const result = await response.json();
        document.getElementById('cipherTextRSA').textContent = result.ciphertext;
    } catch (error) {
        console.error('Error encrypting RSA:', error);
    }
}

async function decryptRSA() {
    const ciphertext = document.getElementById('cipherTextRSA').value;
    try {
        const response = await fetch(`${apiUrl}/decrypt/asymetric`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ciphertext}),
        });
        const result = await response.json();
        document.getElementById('decryptedTextRSA').textContent = result.plaintext;
    } catch (error) {
        console.error('Error decrypting RSA:', error);
    }
}