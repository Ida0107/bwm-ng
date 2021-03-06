import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bwm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errors : string;
  notifyMessage : string;

  constructor(private fb: FormBuilder, 
              private auth : AuthService, 
              private router: Router, 
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.initForm();

    this.route.params.subscribe((params)=> {
      if(params['registered'] === 'success'){
        this.notifyMessage = "you may login now" ; 
        //console.log(this.notifyMessage);
      }
    })
  }

  initForm(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required,
      Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password: ['', Validators.required]
    })
  }

  login(){
    this.auth.loginUser(this.loginForm.value).subscribe(
      (token)=>{
        this.router.navigate(['/rentals'] );
      },
      (errorResponse) => {
        this.errors = errorResponse.error.detail;
        console.log(this.errors)
        
      }
    )
    //console.log(this.loginForm.value.email);
  }

}
