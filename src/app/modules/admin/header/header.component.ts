import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { userRegister } from 'src/app/interface/interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  allUsers: userRegister [] = [];
  is_jonathan:boolean= false
  email!:string


  constructor(private _router:Router ,private user:AuthService) { }

  ngOnInit(): void {

    this.email = localStorage.getItem('email') as string
    console.log(this.email);


    this.user.getAllUsers().subscribe(res=>{
      this.allUsers=res
    })
    this.allUsers.filter(item=>{
      if(item.user_email===this.email){
        this.is_jonathan=true
      }
    })
  }

  logout(){
  localStorage.clear()
  this._router.navigate(['/'])
  }
}
