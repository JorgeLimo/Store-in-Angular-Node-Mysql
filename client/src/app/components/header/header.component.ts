import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public tituloNav:String;

  constructor() {
    this.tituloNav = "BackOffices";
  }

  ngOnInit() {
  }

  myfunction(){
    $("#div").html("<h1>Hola mundo</h1>");
  }

}
