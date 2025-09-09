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
import { AuthService } from 'src/app/Services/auth.service';



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
    public authService: AuthService
  ) {}
  
  public SortOrder = SortOrder; 

  profile = this.authService.profile;
  
  //all items
  products: Product[] = [];
  filteredProducts: Product[] =[]
  categories: Category[] = []
  materials: Materials[] = []
  colours: Colours[] = []
  types: Types[] = []
  conditions: Conditions[] = []
  //selected filters
  productSelected: Product | null = null;
  categorySelected: Category | null = null;
  materialSelected: Materials | null = null;
  colourSelected: Colours | null = null;
  typeSelected: Types | null = null;
  conditionSelected: Conditions | null = null;
  searchQuery: string = '';
  //Sorting
  sortSelected: SortOrder = SortOrder.None;

  



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
    let filtering = this.productSelected ? this.products.filter(product => product?.id === this.productSelected!.id)
    : [...this.products];

    // Search part
    if(this.searchQuery) {
      filtering = filtering.filter(product => 
        this.normalizeString(product.title).includes(this.normalizeString(this.searchQuery))
      );
    }

    // Category part
    if(this.categorySelected) {
      filtering = filtering.filter(product => product.categories?.id === this.categorySelected!.id);
    }

    // Material part
    if(this.materialSelected) {
      filtering = filtering.filter(product => product.material === this.materialSelected);
    }
    

    // Colour part
    if(this.colourSelected) {
      filtering = filtering.filter(product => product.colour === this.colourSelected);
    }

    // Type part
    if(this.typeSelected) {
      filtering = filtering.filter(product => product.type === this.typeSelected);
    }

    // Condition part
    if(this.conditionSelected) {
      filtering = filtering.filter(product => product.condition === this.conditionSelected);
    }
    this.filteredProducts = filtering;
    // Sorting part
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
}





