import { Product } from "./product";

export interface Materials {
    id: number;
    name: string;
    products: Product[];
}