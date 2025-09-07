import { Image } from "./image";
import { Category } from "./category";
import { Profile } from "./profile";
import { Materials } from "./materials";
import { Colours } from "./colours";
import { Types } from "./types";
import { Conditions } from "./conditions";

export interface Product {
    id:number;
    title:string;
    description:string;
    price:number;
    width:number;
    height:number;
    depth:number;
    

    typeId: number;
    type: Types;
    
    conditionId: number;
    condition: Conditions;

    colourId: number;
    colour: Colours;

    
    materialId: number;
    material: Materials;

    categoryId: number;
    category: Category;
    

    profileId: number;
    profile: Profile;


    
    images: Image[];
}