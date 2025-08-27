import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile } from 'src/app/models/profile';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/Services/profile.service';
import { Form, FormsModule } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/Services/product.service';
import { ReactiveFormsModule } from '@angular/forms';

//Work on after merge and thirdparty found


@Component({
    selector: 'app-profile',
    imports: [CommonModule, FormsModule],    
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    standalone: true
})
export class ProfileComponent implements OnInit {
    profile?: Profile;
    profileProducts: Product[] = [];
    selectedProduct?: Product;
    profileForm: Form | undefined;
    
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
                this.loadProducts(); // Refresh the product list
            }, error => {
                this.toastr.error('Failed to delete product');
                console.error(error);
            });
        }
    }

    showSalesHistory()
    {
        var salesHistory = document.getElementById("salesHistory");
        if (salesHistory) {
            if (salesHistory.style.display === "none") {
                salesHistory.style.display = "block";
            } else {
                salesHistory.style.display = "none";
            }
        }
    }
    showPurchaseHistory()
    {
        var purchaseHistory = document.getElementById("purchaseHistory");
        if (purchaseHistory) {
            if (purchaseHistory.style.display === "none") {
                purchaseHistory.style.display = "block";
            } else {
                purchaseHistory.style.display = "none";
            }
        }
    }

    showYourProducts(){
        var allYourProducts = document.getElementById("allYourProducts");
        if(allYourProducts){
            if(allYourProducts.style.display === "none"){
                allYourProducts.style.display ="block";
            } else {
                allYourProducts.style.display ="none";
            }
        }
    }



}
