import { Image } from "./image";
import { Category } from "./category";
import { Profile } from "./profile";

export interface Product {
    id:number;
    title:string;
    description:string;
    price:number;
    colour:string;
    size:string; //Martin data base
    material:string;
    condition:string;
    type:string;

    


    categoryId: number;
    category: Category;
    

    profileId: number;
    profile: Profile;


    
    images: Image[];
}