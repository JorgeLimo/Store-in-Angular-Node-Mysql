import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'; 

declare var $:any;
declare var Jquery:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public correo:String;
  public contra:String;
  //public user:User

  constructor(private auth:AuthService) { 
    //this.user = new User();
  }

  ngOnInit() {
  }


  onLoginSubmit(){

    if(this.correo == "" || this.correo == undefined){
      $("#msjResponseData").html("<div class='alert alert-danger'>Ingresa una correo<div>");
      return false;
    }

    if(this.contra == "" || this.contra == undefined){
      $("#msjResponseData").html("<div class='alert alert-danger'>Ingresa una contraseña<div>");
      return false;
    }
    var user = {
      correo: this.correo,
      contrasenia: this.contra
    } 

    console.log(user);
    this.auth.authenticate(user).subscribe(response => {

      if(response['estado']){
        $("#msjResponseData").html("<div class='alert alert-success'>" + response['mensaje'] + "<div>");
        console.log(response['token']);
      }else{
        $("#msjResponseData").html("<div class='alert alert-danger'>" + response['mensaje'] + "<div>");
      }
    });

  }

}
