function caesarEncrypt(text, shift) {
  return text.replace(/[a-zA-Z]/g, char => {
    const start = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - start + shift) % 26) + start);
  });
}

function caesarDecrypt(text, shift) {
  return caesarEncrypt(text, 26 - shift);
}

module.exports = { caesarEncrypt, caesarDecrypt };