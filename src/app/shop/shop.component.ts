import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  products:any;
  total_count = 0;

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (result) => {
        console.log(result)
        if(result.status && result.data.length > 0){
          this.products = result.data;
          this.total_count = result.data.length;
        }
      }
    )
  }

}
