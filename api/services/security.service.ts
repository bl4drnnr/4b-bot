import * as crypto from "crypto";

export const encrypt = (text: string, key: Buffer, iv: Buffer) => {
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let result = cipher.update(text, "utf8", "hex");
    result += cipher.final("hex");

    return result;
};

export const decrypt = (text: string, key: Buffer, iv: Buffer) => {
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let result = decipher.update(text, "hex", "utf8");
    result += decipher.final("utf8");

    return result;
};

