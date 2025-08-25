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





@Component({
    selector: 'app-products',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule],
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})



export class ProductsComponent implements OnInit {

  constructor(private productService: ProductService, private categoryService: CategoryService) {}
  
  public SortOrder = SortOrder; // Expose the enum to the template
  
  products: Product[] = []
  categories: Category[] = []
  sortSelected: SortOrder = SortOrder.None;


  ngOnInit() {
    this.productService.getProducts().subscribe(x => this.products = x);
    this.categoryService.getAllCategories().subscribe(x => this.categories = x);
  }
  
  sortTheProducts() {
    switch (this.sortSelected) {
      case SortOrder.PriceAsc:
        this.products.sort((a, b) => a.price - b.price);
        break;
      case SortOrder.PriceDesc:
        this.products.sort((a, b) => b.price - a.price);
        break;
      case SortOrder.ColourAsc:
        this.products.sort((a, b) => a.colour.localeCompare(b.colour));
        break;
      case SortOrder.ColourDesc:
        this.products.sort((a, b) => b.colour.localeCompare(a.colour));
        break;
      case SortOrder.MaterialAsc:
        this.products.sort((a, b) => a.material.localeCompare(b.material));
        break;
      case SortOrder.MaterialDesc:
        this.products.sort((a, b) => b.material.localeCompare(a.material));
        break;
      case SortOrder.TypeAsc:
        this.products.sort((a, b) => a.type.localeCompare(b.type));
        break;
      case SortOrder.TypeDesc:
        this.products.sort((a, b) => b.type.localeCompare(a.type));
        break;
      case SortOrder.SizeAsc:
        this.products.sort((a, b) => a.size.localeCompare(b.size));
        break;
      case SortOrder.SizeDesc:
        this.products.sort((a, b) => b.size.localeCompare(a.size));
        break;
      case SortOrder.ConditionAsc:
        this.products.sort((a, b) => a.condition.localeCompare(b.condition));
        break;
      case SortOrder.ConditionDesc:
        this.products.sort((a, b) => b.condition.localeCompare(a.condition));
        break;
      default:
        break;
  }
}


}
