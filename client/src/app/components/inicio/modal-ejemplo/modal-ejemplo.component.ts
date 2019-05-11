import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-ejemplo',
  templateUrl: './modal-ejemplo.component.html',
  styleUrls: ['./modal-ejemplo.component.css']
})
export class ModalEjemploComponent implements OnInit {

  constructor() { }

  
  public onClose:any;
  public valor:String;
  public valor2:String;
  public valor3:String;
  public valor4:String;

  ngOnInit() {
  }

  enviarValores(){

    const prod = {
      id : this.valor,
      nombres : this.valor2,
      producto : this.valor3,
      descripcion : this.valor4,
    }

    this.onClose(prod);
  }

}
