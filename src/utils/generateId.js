export default function genId(length) {
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
