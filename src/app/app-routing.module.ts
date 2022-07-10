import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { ProductInnerComponent } from './product-inner/product-inner.component';
import { ProfileComponent } from './profile/profile.component';
import { ShopComponent } from './shop/shop.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SuccessComponent } from './success/success.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path:'shop', component: ShopComponent},
  {path:'product/:slug', component: ProductInnerComponent},
  {path:'sign-in', component: SignInComponent},
  {path:'sign-up', component: SignUpComponent},
  {path:'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path:'wishlist', component: WishlistComponent, canActivate: [AuthGuardService]},
  {path:'checkout', component: CheckoutComponent},
  {path:'thank-you', component: SuccessComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
