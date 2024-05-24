const n = 26;

function encryptText() {
    // Ambil pesan yang akan diencrypt
    const plaintext = document.getElementById('plaintext').value;

    // Kunci M (bilangan bulat yang relatif prima dengan n)
    const m = parseInt(document.getElementById('m-encrypt').value);

    // Kunci B (Jumlah pergeseran)
    const b = parseInt(document.getElementById('b-encrypt').value);

    // Cek jika kunci m atau b bukan angka
    if (isNaN(m) || isNaN(b)) {
        // pesan error jika m atau b bukan angka
        alert("Masukkan nomor yang valid untuk m dan b.");
        return;
    }

    try {
        // Melakukan proses enkripsi
        const encrypted = encrypt(plaintext, m, b);
        
        // Menampilkan hasil dari enkripsi
        document.getElementById('result-encrypt').innerText = encrypted;
    } catch (e) {
        // Menampilkan pesan error jika terdapat kesalahan
        alert(e.message);
    }
}

function getIndexFromChar(letter) {
    // Fungsi untuk mengambil index dengan mengurangi -97 (Kode ASCII)
    // 'a' -> 0, 'b' -> 1, 'c' -> 2,  ..., 'z' -> 25
    return letter.toLowerCase().charCodeAt(0) - 97; 
}

function getCharFromIndex(index, isUpperCase) {
    // Tambahkan index dengan 97 (Kode ASCII) untuk huruf kecil
    let charCode = index + 97;
    
    // Jika Huruf yang diinput huruf Besar
    if (isUpperCase) {
        charCode -= 32; // Sesuaikan untuk huruf Besar
    }
    
    // Kembalikan nilai dari index menjadi huruf
    return String.fromCharCode(charCode);
}

function encrypt(text, mEncrypt, bEncrypt)    {
    // Variabel untuk menyimpan hasil encripsi
    let encryptedText = '';

    // Looping untuk mengencript perhuruf dari plaintext
    for (let i = 0; i < text.length; i++) {
        // Ambil huruf yang akan diecnript
        let letter = text[i];
        
        // Jika data merupakan huruf (bukan simbol atau angka)
        if (letter.match(/[a-z]/i)) {
            // Check huruf apakah huruf Kapital dengan cek berdasarkan Kode ASCII
            let isUpperCase = (letter.charCodeAt(0) >= 65 && letter.charCodeAt(0) <= 90);
            
            // Ambil index dari huruf 
            let indexFromChar = getIndexFromChar(letter);
            
            // Encrypt huruf menggunakan rumus dari affine cipher
            let encryptedIndex = (mEncrypt * indexFromChar + bEncrypt) % n;
            
            // Ambil huruf dari index yang telah diencrypt dan tambahkan ke dalam variable encryptedText
            encryptedText += getCharFromIndex(encryptedIndex, isUpperCase);
        } else {
            
            // Data tidak akan diencrypt 
            encryptedText += letter;
        }
    }

    // Kembalikan nilai yang telah diencrypt
    return encryptedText;
}

function decryptText() {
    // Ambil ciphertext yang akan didecrypt
    const ciphertext = document.getElementById('ciphertext-decrypt').value;

    // Kunci M (bilangan bulat yang relatif prima dengan n)
    const m = parseInt(document.getElementById('m-decrypt').value);

    // Kunci B (Jumlah pergeseran)
    const b = parseInt(document.getElementById('b-decrypt').value);

    // Cek jika kunci m atau b bukan angka
    if (isNaN(m) || isNaN(b)) {
        // pesan error jika m atau b bukan angka
        alert("Masukkan nomor yang valid untuk m dan b.");
        return;
    }

    try {
        // Melakukan proses dekripsi
        const decrypted = decrypt(ciphertext, m, b);

        // Menampilkan hasil dari dekripsi
        document.getElementById('result-decrypt').innerText = decrypted;
    } catch (e) {
        // Menampilkan pesan error jika terdapat kesalahan
        alert(e.message);
    }
}

function modInverse(m) {
    // Mencari m-1 (inversi m (mod n) yaitu m.m-1 = 1 (mod n)
    for (let i = 1; i < n; i++) {
        if ((m * i) % n === 1) {
            return i;
        }
    }
    return -1;
}

function decrypt(text, mDecrypt, bDecrypt) {
    // Variabel untuk menyimpan hasil dekripsi
    let decryptedText = '';
    
    // hitung m inverse
    const mInverse = modInverse(mDecrypt);
    
    // Looping untuk mendecrypt perhuruf dari ciphertext
    for (let i = 0; i < text.length; i++) {
        // Ambil huruf yang akan didecrypt
        let letter = text[i];

        // Jika data merupakan huruf (bukan simbol atau angka)
        if (letter.match(/[a-z]/i)) {
            // Check huruf apakah huruf Kapital dengan cek berdasarkan Kode ASCII
            let isUpperCase = (letter.charCodeAt(0) >= 65 && letter.charCodeAt(0) <= 90);

            // Ambil index dari huruf 
            let indexFromChar = getIndexFromChar(letter);

            // Decrypt huruf menggunakan rumus dari affine cipher
            let decryptedIndex = (mInverse * (indexFromChar - bDecrypt + n)) % n;

            // Ambil huruf dari index yang telah didecrypt dan tambahkan ke dalam variable decryptedText
            decryptedText += getCharFromIndex(decryptedIndex, isUpperCase);
        } else {

            // Data tidak akan didecrypt 
            decryptedText += letter;
        }
    }

    // Kembalikan nilai yang telah didecrypt
    return decryptedText;
}

function cryptoAnalysis() {
    // Ambil ciphertext yang akan di criptoanalisis
    const ciphertext = document.getElementById('ciphertext-criptoanalis').value;
    
    // Variable untuk menampung semua hasil kemungkinan dekripsi kriptoanalis
    let result = [];

    // Bilangan prima yang valid relatif dengan n
    const bilPrimaValid = [1, 2, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];

    // looping semua bilangan prima yang memungkinakan digunakan
    for (let m of bilPrimaValid) {
        
        // Looping semua bilangan yang lebih kecil dari n
        for (let b = 0; b < n; b++) {
            try {
                // Decrypt masing masing m dan b yang didapatkan
                const dekripsiTeks = decrypt(ciphertext, m, b);
                
                // Ambil nilai yang didecript dan simpan kedalam variable 
                result.push({ dekripsiTeks, m, b });
            } catch (e) {
                continue;
            }
        }
    }

    // Tampilkan result dengan melooping tiap hasil menjadi row
    const tbody = document.getElementById('resultTable').getElementsByTagName('tbody')[0];
    result.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${item.m}</td>
                    <td>${item.b}</td>
                    <td>${item.dekripsiTeks}</td>
                `;
        tbody.appendChild(row);
    });
    
}