import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private auth:AuthService,private router: Router) { 
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
      if(response["estado"]){
        var usuarioData = JSON.parse(JSON.stringify(response['usuario'][0]));
        console.log(usuarioData.nombres);
        this.auth.storeUserData(response['token'], usuarioData.nombres, usuarioData.apellidos, usuarioData.foto);
        $("#msjResponseData").html("<div class='alert alert-success'>" + response['mensaje'] + "<div>");
        
        this.router.navigate(['/usuarios']);
      }else{
        $("#msjResponseData").html("<div class='alert alert-danger'>" + response['mensaje'] + "<div>");
      }
      
    });

  }

}
