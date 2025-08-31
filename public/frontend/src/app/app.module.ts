import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home-page/home/home.component';
import { ProductsComponent } from './components/product-pages/product/products/products.component';
import { ProductMakeComponent } from './components/product-pages/productMaking/product-make/product-make.component';
import { ProfileComponent } from './components/profile-pages/profile/profile.component';
import { ProductDetailComponent } from './components/product-pages/productDetails/product-detail/product-detail.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoginComponent } from './components/login-page/login/login.component';
import { BasketComponent } from './components/basket-page/basket/basket.component';
import { CheckoutpageComponent } from './components/checkout/checkoutpage/checkoutpage.component';
import { RegisterComponent } from './components/register-page/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    CheckoutpageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeComponent,
    ProductsComponent,
    ProductDetailComponent,
    ProductMakeComponent,
    BasketComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    NavbarComponent,
    MatDialogModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
