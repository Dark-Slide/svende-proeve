import { Product } from "./product";

export interface Image {
  id: number;
    
  productId: number;
  product: Product;

  url: string;


}