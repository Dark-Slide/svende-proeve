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
    private router: Router
  ) {}
  
  public SortOrder = SortOrder; 
  
  products: Product[] = [];
  filteredProducts: Product[] =[]
  categories: Category[] = []
  materials: Materials[] = []
  colours: Colours[] = []
  types: Types[] = []
  conditions: Conditions[] = []
  categorySelected: Category | null = null;
  sortSelected: SortOrder = SortOrder.None;
  searchQuery: string = '';


  ngOnInit() {
    this.productService.getProducts().subscribe(sofa => {this.products = sofa; this.searchFilteredProducts();});
    this.categoryService.getAllCategories().subscribe(x => this.categories = x);
    this.materialService.getAllMaterials().subscribe(x => this.materials = x);
    this.colourService.getAllColours().subscribe(x => this.colours = x);
    this.typeService.getAllTypes().subscribe(x => this.types = x);
    this.conditionService.getAllConditions().subscribe(x => this.conditions = x);
    //this.filteredProducts = this.products;
  }

  normalizeString(str: string): string {
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[-_  --]/g, " ");
  }

  searchFilteredProducts(){
    let filteredByCategory = this.categorySelected ? this.products.filter(product => product.category?.id === this.categorySelected!.id)
    : [...this.products]

    //Search part
    filteredByCategory = filteredByCategory.filter(product => this.normalizeString(product.title).includes(this.normalizeString(this.searchQuery)));


    this.filteredProducts = filteredByCategory;


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
selectedMaterialId: number | null = null;
selectedColourId: number | null = null;
selectedTypeId: number | null = null;
selectedConditionId: number | null = null;

filterProducts() {
  let filtered = [...this.products];

  if (this.categorySelected) {
    filtered = filtered.filter(product => product.category?.id === this.categorySelected!.id);
    
  }

  if (this.selectedMaterialId) {
    filtered = filtered.filter(product => String(product.material) === String(this.selectedMaterialId));
  }

  if (this.selectedColourId) {
    filtered = filtered.filter(product => String(product.colour) === String(this.selectedColourId));
  }

  if (this.selectedTypeId) {
    filtered = filtered.filter(product => String(product.type) === String(this.selectedTypeId));
  }

  if (this.selectedConditionId) {
    filtered = filtered.filter(product => String(product.condition) === String(this.selectedConditionId));
  }

  this.filteredProducts = filtered; 

  this.sortTheProducts();
}


}
