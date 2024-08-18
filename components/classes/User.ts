import UserInterface from "@/interfaces/UserInterface";
import { randomBytes } from 'crypto';

export class User implements UserInterface{
    id: string;
    email: string;
    password: string;

    constructor(email: string, password: string, id?: string) {
        this.id = id || this.generateUniqueId();
        this.email = email;
        this.password = password;
    }

    // Generate a unique ID using crypto
    private generateUniqueId(): string {
        return randomBytes(16).toString('hex');
    }
}