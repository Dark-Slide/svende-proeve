import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';
import { Profile } from 'src/app/models/profile';
import { ProductService } from 'src/app/Services/product.service'; 
import { AuthService } from 'src/app/Services/auth.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr'; 
import { finalize } from 'rxjs';
import { BasketService } from 'src/app/Services/basket.service';


@Component({
    selector: 'app-product-detail',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product?: Product ;
  profile!: Profile;
  products: Product[] = [];

  constructor(
    private productService: ProductService, 
    private route: ActivatedRoute, 
    private toastr: ToastrService, 
    private router: Router,
    private basketService: BasketService
    
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }
    
    
    loadProduct(): void {
      this.route.params.subscribe((params) => {
        this.productService.getProductById(params['productId']).subscribe((product) => {
          if(!product) return;
          this.product = product;
        
        });
      })
    }
    
    deleteProduct(productId: number | undefined): void {
      if (this.product) {
        this.productService.deleteProduct(this.product.id).subscribe(() => {
          this.toastr.success('Product deleted successfully');
          this.router.navigate(['/products']); 
        }, error => {
          this.toastr.error('Failed to delete product');
          console.error(error);
        });
      }
    }
    
    addToBasket(productId: number): void {
    const product = this.products.find(p => p.id === productId);
    if (!product) {
      this.toastr.error('Sofaen blev ikke fundet');
      return;
    }
    this.toastr.success('Sofaen er nu tilføjet til kurven');
    const basketItem = {
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: 1,
      productModel: product,
      orderId: 0 
    };
    this.basketService.addToBasket(basketItem);
  }
  

}
