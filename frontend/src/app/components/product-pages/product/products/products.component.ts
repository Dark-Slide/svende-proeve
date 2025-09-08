import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/Services/category.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SortOrder } from 'src/app/utensils/sort.enum';
import { AppRoutingModule } from "src/app/app-routing.module";
import { Colours } from 'src/app/models/colours';
import { Materials } from 'src/app/models/materials';
import { Types } from 'src/app/models/types';
import { Conditions } from 'src/app/models/conditions';
import { ColourService } from 'src/app/Services/colour.service';
import { MaterialService } from 'src/app/Services/material.service';
import { TypeService } from 'src/app/Services/type.service';
import { ConditionsService } from 'src/app/Services/condition.service'; 



@Component({
    selector: 'app-products',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})



export class ProductsComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private materialService: MaterialService,
    private colourService: ColourService,
    private typeService: TypeService,
    private conditionService: ConditionsService,
  ) {}
  
  public SortOrder = SortOrder; 
  
  products: Product[] = [];
  filteredProducts: Product[] =[]
  categories: Category[] = []
  materials: Materials[] = []
  colours: Colours[] = []
  types: Types[] = []
  conditions: Conditions[] = []
  //categorySelected: Category | null = null;
  productSelected: Product | null = null;
  sortSelected: SortOrder = SortOrder.None;
  searchQuery: string = '';



  ngOnInit() {
    this.productService.getProducts().subscribe(sofa => {this.products = sofa; this.searchFilteredProducts();});
    this.categoryService.getAllCategories().subscribe(cat => this.categories = cat);
    this.materialService.getAllMaterials().subscribe(mat => this.materials = mat);
    this.colourService.getAllColours().subscribe(col => this.colours = col);
    this.typeService.getAllTypes().subscribe(typ => this.types = typ);
    this.conditionService.getAllConditions().subscribe(con => this.conditions = con);
    
    
  }

  normalizeString(str: string): string {
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[-_ ]/g, " ");
  }

  searchFilteredProducts(){
    let filteredByProduct = this.productSelected ? this.products.filter(product => product?.id === this.productSelected!.id)
    : [...this.products]

    //Search part
    filteredByProduct = filteredByProduct.filter(product => this.normalizeString(product.title).includes(this.normalizeString(this.searchQuery)));

    //Material part
    filteredByProduct = this.selectedMaterialId ?
    filteredByProduct.filter(product => { 
       String(product.materialId) === String(this.selectedMaterialId)}) : filteredByProduct;

    this.filteredProducts = filteredByProduct;


    this.sortTheProducts();

  }


  

  sortTheProducts() {
    switch (this.sortSelected) {
      case SortOrder.PriceAsc:
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case SortOrder.PriceDesc:
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
  }
  
}
filterHolder(){}



//Filtering part
selectedColourId: number | null = null;
selectedTypeId: number | null = null;
selectedConditionId: number | null = null;
selectedMaterialId: number | null = null;

conditionFilter() { 
  let filteredByCondition = this.selectedConditionId ?
  this.products.filter(product => { 
    const conditionId = typeof product.condition === 'object' ? product.condition?.id : product.condition;
    return String(conditionId) === String(this.selectedConditionId)}) : [...this.products];

  this.filteredProducts = filteredByCondition;

  this.sortTheProducts();
}

typeFilter() { 
  let filteredByType = this.selectedTypeId ?
  this.products.filter(product => { 
    const typeId = typeof product.type === 'object' ? product.type?.id : product.type;
    return String(typeId) === String(this.selectedTypeId)}) : [...this.products];

  this.filteredProducts = filteredByType;

  this.sortTheProducts();
}

colourFilter() { 
  let filteredByColour = this.selectedColourId ?
  this.products.filter(product => { 
    const colourId = typeof product.colour === 'object' ? product.colour?.id : product.colour;
    return String(colourId) === String(this.selectedColourId)}) : [...this.products];
    
  this.filteredProducts = filteredByColour;
  this.sortTheProducts();
}


materialFilter() { 
  let filteredByMaterial = this.selectedMaterialId ?
  this.products.filter(product => { 
    const materialId = typeof product.material === 'object' ? product.material?.id : product.material;
    return String(materialId) === String(this.selectedMaterialId)}) : [...this.products];

  this.filteredProducts = filteredByMaterial;

  this.sortTheProducts();
}



}


