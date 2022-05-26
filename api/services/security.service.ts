import * as crypto from "crypto";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.resolve(__dirname, "../.env")
});

// @ts-ignore
const key = Buffer.from(process.env.CRYPTO_KEY, "hex");
// @ts-ignore
const iv = Buffer.from(process.env.IV, "hex");

export const encrypt = (text: string) => {
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let result = cipher.update(text, "utf8", "hex");
    result += cipher.final("hex");

    return result;
};

export const decrypt = (text: string) => {
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let result = decipher.update(text, "hex", "utf8");
    result += decipher.final("utf8");

    return result;
};

