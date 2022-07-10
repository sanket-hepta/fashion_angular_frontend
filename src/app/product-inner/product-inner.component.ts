import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { CartComponent } from '../cart/cart.component';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-inner',
  templateUrl: './product-inner.component.html',
  styleUrls: ['./product-inner.component.css']
})
export class ProductInnerComponent implements OnInit {

  constructor(private route: ActivatedRoute,  private router: Router, private authService: AuthService, private productService: ProductsService, private cartService: CartService) { }

  slug:any = '';
  product:any;

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');

    this.productService.getProduct(this.slug).subscribe(
      (result) => {
        if(result.status){
          this.product = result.data;
        }
      }
    )

  }

  add_to_cart(produdct_data: any){
    let cartComponet = new CartComponent(this.cartService, this.authService, this.router);
    cartComponet.addToCart(produdct_data);
  }

}
