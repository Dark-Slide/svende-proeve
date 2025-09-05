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

  constructor(
    private productService: ProductService, 
    private route: ActivatedRoute, 
    private toastr: ToastrService, 
    private router: Router
    
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
  

}
