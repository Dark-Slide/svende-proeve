import { Product } from "./product";

export interface Conditions {
    id: number;
    name: string;
    products: Product[];
}