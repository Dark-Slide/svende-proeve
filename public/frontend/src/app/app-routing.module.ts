import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home-page/home/home.component';
import { ProductsComponent } from './components/product-pages/product/products/products.component';
import { ProductMakeComponent } from './components/product-pages/productMaking/product-make/product-make.component';
import { ProfileComponent } from './components/profile-pages/profile/profile.component';
import { ProductDetailComponent } from './components/product-pages/productDetails/product-detail/product-detail.component';
import { RegisterComponent } from './components/register-page/register/register.component';
import { BasketComponent } from './components/basket-page/basket/basket.component';
import { LoginComponent } from './components/login-page/login/login.component';

const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'productMaking', component: ProductMakeComponent},
  {path: 'productDetail', component: ProductDetailComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'basket', component: BasketComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
