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
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';




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
    isOwner: boolean = false;

    loggedInProfile: Profile | null = null;

    salesHistory: boolean = false;
    purchaseHistory: boolean = false;
    allYourProducts: boolean = false;
    
    constructor(
        private profileService: ProfileService,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private productService: ProductService,
        private authService: AuthService
    ) {}
    
    async ngOnInit() {
        
        this.loggedInProfile = await firstValueFrom(this.authService.getProfileUser());
        this.loadProfile();
    }
    
    loadProfile() {
        this.activatedRoute.params.subscribe(params => {
            this.profileService.findProfileById(params['profileId']).subscribe(profile => {
                this.profile = profile;
                this.isOwner = this.loggedInProfile?.id === this.profile.id;
            })
        })
    }
    
    
    deleteProduct(productId: number): void {
        this.productService.deleteProduct(productId).subscribe(() => {
            this.profileProducts = this.profileProducts.filter(product => product.id !== productId);


            this.toastr.success('Product deleted successfully');
        });
    }

    loadProducts(): void { 
        this.activatedRoute.params.subscribe(params => { 
            this.productService.getByProfileId(params['profileId']).subscribe(products => { console.log(products);
                this.profileProducts = products; }, error => { this.toastr.error('Failed to load products for this profile'); console.error(error); 

                }); 
            }); 
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
        if(this.allYourProducts){
            this.allYourProducts = false;
        } else {
            this.loadProducts
        }

    }

}
