export const imgSrcBase64 = "data:image/svg+xml+jpeg+png;base64";

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const validatePass = (password) => {
    return String(password)
        .toLowerCase()
        .match(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/);
}

const genId = (length) => {
    let res = "";
    const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charLen = char.length;
    let cnt = 0;
    while (cnt < length) {
        res += char.charAt(Math.floor(Math.random() * charLen));
        cnt++;
    }
    return res;
}

// Convert file to Base64
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

// Convert url to Object file
const urlToFile = async (url, filename, mimeType) => {
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    return new File([buf], filename, {type: mimeType});
};

const formatTime = (time) => {
    return new Date(time * 1000)
        .toISOString()
        .slice(11, 19);
}

// 2024-06-27T14:48:38.000Z => 14:48:38 27/06/2024
const convertTimeToISO = (time) => {
    // another way to using package moment
    return new Date(time)
        .toISOString()
        .replace(/T/, " ")
        .replace(/\..+/, "")
        .split(" ")
        .reverse()
        .join(" ");
}

export {validateEmail, validatePass, genId, toBase64, urlToFile, formatTime, convertTimeToISO}