import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home-page/home/home.component';
import { ProductsComponent } from './components/product-pages/product/products/products.component';
import { ProductMakeComponent } from './components/product-pages/productMaking/product-make/product-make.component';
import { ProfileComponent } from './components/profile-pages/profile/profile.component';
import { ProductDetailComponent } from './components/product-pages/productDetails/product-detail/product-detail.component';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    ProductMakeComponent,
    ProfileComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
