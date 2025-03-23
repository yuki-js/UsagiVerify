export declare function decodePayload(payload: Buffer): {
    key: string;
    value: string;
}[];
export declare function encodePayload(payload: Array<{
    key: string;
    value: string;
}>): Buffer<ArrayBuffer>;
export declare function calculateSha256(input: Buffer): Buffer;
export declare function calculateMac(derivedKey: Buffer, payload: Buffer): Buffer;
export declare function deriveResponseMacKey(masterSecret: Buffer): Buffer;
//# sourceMappingURL=index.d.ts.map