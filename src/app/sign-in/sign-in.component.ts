import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  message: String = '';
  error_message: String = '';

  signInForm: FormGroup;
  submitted:boolean = false;

  constructor(private formBilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signInForm = this.formBilder.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(8)]]
    });


    if(this.authService.isUserLoggedIn()){
      this.router.navigate(['profile'])
      .then(() => {
        window.location.reload();
      });
    }
  }

  get form(){
    return this.signInForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if(this.signInForm.invalid){
      return false;
    }

    let formData = this.signInForm.value;

    this.authService.signIn(formData).subscribe(

      (data) => {
        if(data.status){
          this.authService.isLoggedInUser = true
          localStorage.setItem('isLoggedInUser', "true");
          localStorage.setItem('userID', data.data._id);
          localStorage.setItem('userToken', data.data.token);

          this.router.navigate(['profile'])
          .then(() => {
            window.location.reload();
          });
        }else{
          this.error_message = data.message;
        }
      },

      (error) => {
        console.log(error);
        if(!error.status){
          this.error_message = error.message;
        }
      }

    )

    return true;
  }

}
