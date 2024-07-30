function checkCriteria() {
    // Checks whether at least one checkbox is selected and the length is valid
    const includeUpperCase = document.getElementById("upperCase").checked;
    const includeLowerCase = document.getElementById("lowerCase").checked;
    const includeSpecial = document.getElementById("specialChars").checked;
    const includeNumbers = document.getElementById("numbers").checked;
    const length = parseInt(document.getElementById("length").value, 10);

    const generateBtn = document.getElementById("generateBtn");
    if ((includeUpperCase || includeLowerCase || includeSpecial || includeNumbers) && length >= 4 && length <= 20) {
        generateBtn.disabled = false;
    } else {
        generateBtn.disabled = true;
    }
}

function shuffleString(str) {
    let array = str.split('');
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array.join('');
}

function generatePassword() {
    const includeUpperCase = document.getElementById("upperCase").checked;
    const includeLowerCase = document.getElementById("lowerCase").checked;
    const includeSpecial = document.getElementById("specialChars").checked;
    const includeNumbers = document.getElementById("numbers").checked;
    const length = parseInt(document.getElementById("length").value, 10);

    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";
    const numberChars = "0123456789";

    let characterPool = "";
    if (includeUpperCase) characterPool += upperCaseChars;
    if (includeLowerCase) characterPool += lowerCaseChars;
    if (includeSpecial) characterPool += specialChars;
    if (includeNumbers) characterPool += numberChars;

    characterPool = shuffleString(characterPool);

    let password = "";
    let lastChar = "";
    let repeatCount = 0;

    for (let i = 0; i < length; i++) {
        let newChar = characterPool.charAt(Math.floor(Math.random() * characterPool.length));

        // Ensure no more than 2 consecutive identical characters
        if (newChar === lastChar) {
            repeatCount++;
        } else {
            repeatCount = 0;
        }

        if (repeatCount <= 2) {
            password += newChar;
            lastChar = newChar;
        } else {
            // Reset repeat count and pick a new character
            i--;
            repeatCount = 0;
        }
    }
    document.getElementById("password").textContent = password;
    document.getElementById("generatedPasswordContainer").style.display = 'block';
    document.getElementById("copyBtn").disabled = false;
}

function copyPassword() {
    const passwordText = document.getElementById("password").textContent;
    navigator.clipboard.writeText(passwordText).then(() => {
        alert("Password copied to clipboard!");
    }, () => {
        alert("Failed to copy password.");
    });
}

// Initial check to ensure the button is enabled/disabled on page load
window.onload = checkCriteria;