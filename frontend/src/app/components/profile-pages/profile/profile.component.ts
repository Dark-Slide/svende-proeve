import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile } from 'src/app/models/profile';
import { ActivatedRoute } from '@angular/router';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { ProfileService } from 'src/app/Services/profile.service';
import { Form, FormsModule } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/Services/product.service';
import { ReactiveFormsModule } from '@angular/forms';




@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],    
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
    
})
export class ProfileComponent implements OnInit {
    profile?: Profile;
    profileProducts: Product[] = [];
    selectedProduct?: Product;
    profileForm: Form | undefined;

    salesHistory: boolean = false;
    purchaseHistory: boolean = false;
    allYourProducts: boolean = false;
    
    constructor(
        private profileService: ProfileService,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private productService: ProductService
    ) {}
    
    async ngOnInit() {
        
        this.loadProfile();
        this.loadProducts();
    }
    
    loadProfile() {
        this.activatedRoute.params.subscribe(params => {
            this.profileService.findProfileById(params['profileId']).subscribe(profile => {
                this.profile = profile;

                this.productService.getByProfileId(this.profile?.id).subscribe(products => this.profileProducts = products);
            })
        })
    }
    
    loadProducts(): void {
        this.activatedRoute.params.subscribe(params => {
            this.productService.getByProfileId(params['profileId']).subscribe(products => {
                this.profileProducts = products;
            }, error => {
                this.toastr.error('Failed to load products for this profile');
                console.error(error);
            });
        });
    }
    deleteProduct(productId: number | undefined): void {
        if (this.selectedProduct) {
            this.productService.deleteProduct(this.selectedProduct.id).subscribe(() => {
                this.toastr.success('Product deleted successfully');
                this.loadProducts(); 
            }, error => {
                this.toastr.error('Failed to delete product');
                console.error(error);
            });
        }
    }

    showSalesHistory()
    {
        this.salesHistory = !this.salesHistory;
    }
    showPurchaseHistory()
    {
        this.purchaseHistory = !this.purchaseHistory;
    }

    showYourProducts(){
        this.allYourProducts = !this.allYourProducts;

    }

}
