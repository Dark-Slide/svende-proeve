import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { Product } from 'src/app/models/product';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, HttpClientModule], 
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
    
})
export class HomeComponent implements OnInit{
    featuredProducts: Product[] = [];

    constructor(private productService: ProductService){}

    ngOnInit(): void {
        this.loadFeaturedProducts();
    }

    loadFeaturedProducts(): void {
        this.productService.getProducts()
        .subscribe((products: Product[]) => {this.featuredProducts = products;},
         (error)=>{console.error('Error loading featured products', error);

         }
        );
    }


}
