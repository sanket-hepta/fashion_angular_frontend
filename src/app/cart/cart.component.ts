import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart_count:number = 0;
  cart_data:any;
  cart_total: number = 0;

  constructor(private cartService: CartService, private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.getCartData();
  }

  getCartData(){
    this.cartService.getCartData().subscribe(
      (result) => {
        if(result.status && result.data.length > 0){
          this.cart_data = result.data;
          this.cart_count = result.data.length;
          this.cart_total = result.total_amount;
        }
      }
    )
  }

  addToCart(data:any){

    let cart_data = {
      "product_name": data.product_name,
      "image_url": data.image_url,
      "price": data.price,
      "quantity": 1
    }

    this.cartService.addToCart(cart_data).subscribe(
      (result) => {
        console.log(result);
        let cart_action = document.getElementsByClassName('cart-open-icon')[0] as HTMLElement;
        cart_action.click();
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.getCartData();
      }
    )
  }

  removeCart(id:string){
    this.cartService.removeFromCart(id).subscribe(
      (result) => {

      },
      (error) => {

      },
      () => {
        this.getCartData();
      }
    )
  }

}
