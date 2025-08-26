import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';
import { Profile } from 'src/app/models/profile';
import { ProductService } from 'src/app/Services/product.service'; // Assuming a service to fetch product details
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr'; // Assuming ToastrService for notifications

@Component({
    selector: 'app-product-detail',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent /*implements OnInit*/ {
  product?: Product ;
  profile!: Profile;

  constructor(
    private productService: ProductService, // Assuming a service to fetch product details
    private route: ActivatedRoute, // To get the product ID from the route
    private toastr: ToastrService, // Assuming ToastrService for notifications
    private router: Router // Assuming RouterModule for navigation



    
  ) {}

  ngOnInit(): void {}
    
    
    loadProduct(): void {
      this.route.params.subscribe((params) => {
        this.productService.getProductById(params['id']).subscribe((product: Product) => {
          if(!product) return;
          this.product = product;
        
        });
      })
    }
    deleteProduct(productId: number | undefined): void {
      if (this.product) {
        this.productService.deleteProduct(this.product.id).subscribe(() => {
          this.toastr.success('Product deleted successfully');
          this.router.navigate(['/products']); // Navigate back to the products list
        }, error => {
          this.toastr.error('Failed to delete product');
          console.error(error);
        });
      }
    }
  

}
