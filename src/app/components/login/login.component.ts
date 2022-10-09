import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  state: string = '';

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userLogin: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  login() {
    this.state='INPROGRESS';
    this.authService.login(this.loginForm.value).subscribe({
      complete: () => {
        this.state=''; 
        this.router.navigateByUrl(''); 
      },
      error: (err) => { 
        this.state='ERROR';
        console.log(err); 
      }
    });
  }

}
