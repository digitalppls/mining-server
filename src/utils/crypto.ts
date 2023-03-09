
import { Logger } from '@nestjs/common';
import crypto from "crypto";
import { Contract, HDNodeWallet, JsonRpcProvider, Wallet, getAddress, verifyMessage } from "ethers";

function wrapSecret(secret): string {
    return "00000000000000000000000000000000".split("").map((char, index) => secret.substring(index, index + 1) || char).join("")
}

export function encode(message: string, secret: string): string {
    secret = wrapSecret(secret);
    const iv = crypto.randomBytes(16).toString("hex").slice(0, 16);
    console.log(secret, iv)
    const encrypter = crypto.createCipheriv("aes-256-cbc", secret, iv);
    let code = encrypter.update(message, "utf-8", "hex");
    code += encrypter.final("hex");
    return code + ":" + iv;
}

export function decode(codeWithIv: string, secret: string): string {
    secret = wrapSecret(secret);
    const [code, iv] = codeWithIv.split(":");
    const decrypter = crypto.createDecipheriv("aes-256-cbc", secret, iv);
    let message = decrypter.update(code, "hex", "utf8");
    message += decrypter.final("utf8");
    return message;
}

export function createWallet(): HDNodeWallet {
    return Wallet.createRandom();
}

export async function callContract(rpc: string, contractAddress: string, method: string, args: any[], abi: any): Promise<any> {
    const provider = new JsonRpcProvider(rpc);
    const contract = new Contract(contractAddress, abi, provider)
    try {
        return await contract[method](...args);
    } catch (err) {
        Logger.error(`${rpc} ERROR`, "callContract")
        return null;
    }
}

export function validateSignature(message: string, address: string, signature: string): boolean {
    try {
        const signerAddr = verifyMessage(message, signature);
        if (signerAddr.toLowerCase() !== address.toLowerCase()) {
            console.log(signerAddr, "!==", address)
            return false;
        }
        return true;
    } catch (err: any) {
        Logger.warn((err?.message || "INVALID SIGNATURE") + " " + address + ' ' + signature, "VALIDATE SIGNATURE");
        return false;
    }
}

export function getEthAddress(address: string): string {
    try {
        return getAddress(address)
    } catch (err) {
        console.log(err);
        return null;
    }
}