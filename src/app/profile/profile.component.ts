import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  message:string = '';
  error_message:string = '';

  signUpForm: FormGroup;
  submitted:boolean = false;

  profileData:any;

  constructor(private formBilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.formBilder.group({
      id:['',[Validators.required]],
      first_name:['',[Validators.required]],
      last_name:['',[Validators.required]],
      email:['',[Validators.required]],
      mobile_number:['',[Validators.required]]
    });

    let userid: string = this.authService.userID;

    this.authService.getUser(userid).subscribe(
      (user_details) => {
        if(user_details.status){
          console.log(user_details.data);
          this.profileData = user_details.data;
        }
      }
    );

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

    this.authService.profile(formData).subscribe(

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
