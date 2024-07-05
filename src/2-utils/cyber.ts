import crypto from "crypto";

// Cyber operations:
class Cyber {

    // Hashing salt:
    private readonly hashingSalt = "MakeThingsGoRight";

    // Hash password:
    public hash(plainText: string): string {
        if (!plainText) return null;
        return crypto.createHmac("sha512", this.hashingSalt).update(plainText).digest("hex");
    }
}

export const cyber = new Cyber();
