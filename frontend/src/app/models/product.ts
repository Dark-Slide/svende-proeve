import { Image } from "./image";
import { Category } from "./category";
import { Profile } from "./profile";
import { Materials } from "./materials";

export interface Product {
    id:number;
    title:string;
    description:string;
    price:number;
    colour:string;
    width:number;
    height:number;
    depth:number;


    condition:string;
    type:string;

    
    materialId: number;
    material: Materials;

    categoryId: number;
    category: Category;
    

    profileId: number;
    profile: Profile;


    
    images: Image[];
}