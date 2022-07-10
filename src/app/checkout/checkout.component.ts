import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cart_count:number = 0;
  cart_data:any;
  cart_total: number = 0;

  message: String = '';
  error_message: String = '';

  orderForm: FormGroup;
  submitted:boolean = false;

  constructor(private cartService: CartService, private router: Router,  private formBilder: FormBuilder, private checkoutService: CheckoutService) { }

  ngOnInit(): void {
    this.getCartData();

    this.orderForm = this.formBilder.group({
      first_name:['',[Validators.required]],
      last_name:['',[Validators.required]],
      mobile_number:['',[Validators.required]],
      email:['',[Validators.required, Validators.email]],
      address:['',[Validators.required]],
      pincode:['',[Validators.required]],
      state:['',[Validators.required]],
      city:['',[Validators.required]],
    });

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


  get form(){
    return this.orderForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if(this.orderForm.invalid){
      return false;
    }

    let formData = this.orderForm.value;

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    let checkout_form = {
      session_id: localStorage.getItem('sessionID'),
      cart: this.cart_data,
      address: {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        mobile_no: formData.mobile_no,
        address: formData.address,
        pincode: formData.pincode,
        state: formData.state,
        city: formData.city
      },
      total_amount: this.cart_total,
      payment_method:'cod',
      transaction_date: mm + '/' + dd + '/' + yyyy
    }

    this.checkoutService.createOrder(checkout_form).subscribe(

      (data) => {
        if(data.status){

          localStorage.setItem('sessionID', Date.now().toString(36) + Math.random().toString(36).substr(2));

          this.message = data.message;
          this.router.navigate(['thank-you'])
          .then(() => {
            window.location.reload();
          });
        }else{
          this.error_message = data.message;
        }
      },

      (error) => {
        if(!error.status){
          this.error_message = error.message;
        }
      }

    )

    return true;
  }

}
