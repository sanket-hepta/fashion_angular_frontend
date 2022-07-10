import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  message: String = '';
  error_message: String = '';

  signUpForm: FormGroup;
  submitted:boolean = false;

  constructor(private formBilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.formBilder.group({
      first_name:['',[Validators.required]],
      last_name:['',[Validators.required]],
      mobile_number:['',[Validators.required]],
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
    return this.signUpForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if(this.signUpForm.invalid){
      return false;
    }

    let formData = this.signUpForm.value;
    formData.username = formData.first_name+' '+formData.last_name;
    formData.isAdmin = false;

    this.authService.signUp(formData).subscribe(

      (data) => {
        if(data.status){
          this.message = data.message;
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
