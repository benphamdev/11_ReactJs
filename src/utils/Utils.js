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

export {validateEmail, validatePass, genId}