import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authServ:AuthService,private router: Router) { }

  ngOnInit() {
  }


  cerrarSesion(){
    this.authServ.logout();
    this.router.navigate(['/iniciar-sesion']);
  }

}
