import { Product } from "./product";

export interface Profile {
    id: number;
    username: string;
    email: string;
    products: Product[];
}