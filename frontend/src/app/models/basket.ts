import { Product } from "./product";

export interface Basket {
    items: BasketItem[];
}

export interface BasketItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    productModel: Product;
    orderId: number;
}