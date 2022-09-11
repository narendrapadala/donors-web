import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName: any;
  password: any;
  showAlert: boolean = false;

  users: any = [
    {
      "username": "narendra",
      "password": "Nar@123"
    },
    {
      "username": "sriram",
      "password": "Sriram@123$"
    },
    {
      "username": "bhaskar",
      "password": "Bhaskar@123$"
    },
    {
      "username": "krishana",
      "password": "Krishna@123$"
    },
    {
      "username": "kiran",
      "password": "Kiran@123$"
    },
    {
      "username": "kishore",
      "password": "Kishore@123$"
    },
  ];

  constructor(private route: Router, private authService: AuthServiceService) { }

  checkUser(uname: any, pswd: any) {
    var user = this.users.find(function (user: any) {
      return user.username === uname && user.password === pswd
    });
    if (user == null) {
      return false;
    }
    else {
      return true;
    }
  }



  ngOnInit(): void {
    // console.log(this.authService.LoginStatus)
      if (this.authService.LoginStatus) {
        this.route.navigate(['/donate']);
        return;
      }
  }

  login() {
    if (this.checkUser(this.userName, this.password)) {
      this.authService.setLoginStatus(true);
      this.route.navigate(['/donate'])
    } else {
      this.showAlert = true
    }
  }


}
