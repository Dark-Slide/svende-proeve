import { Product } from "./product";

export interface Image {
  id: number;
    
  productId: number;
  product: Product;

  imageUrl: string;


}

//image_id, image_url