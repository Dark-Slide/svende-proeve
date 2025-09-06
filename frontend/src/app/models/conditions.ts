import { Product } from "./product";

export interface Conditions {
    id: number;
    Ny:  true;
    Brugt: false;
    products: Product[];
}