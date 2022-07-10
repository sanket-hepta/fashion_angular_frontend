import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cart_count:number = 0;

  constructor(private authService: AuthService, private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCartData().subscribe(
      (result) => {
        console.log("1");
        if(result.status && result.data.length > 0){
          this.cart_count = result.data.length;
        }
      },

      (error) => {
        console.log("2");
        this.cart_count = 0;
      }

    )
  }

  logout(){
    this.authService.logoutUser();
    this.router.navigate(['/sign-in'])
      .then(() => {
        window.location.reload();
      });
  }

}
