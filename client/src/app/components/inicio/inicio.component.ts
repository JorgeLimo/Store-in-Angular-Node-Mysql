import { Component, OnInit } from '@angular/core';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModalEjemploComponent } from '../inicio/modal-ejemplo/modal-ejemplo.component'; 

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  modalRef: BsModalRef;
  public items:Object[];
  
  constructor(private modalService: BsModalService) {

    this.items = [];
    this.items.push(
      {
        id : "1", nombre : "Jabon", producto : "oreal", descripcion : "BLA BLA BLA" 
      }
    );
    
  }

  ngOnInit() {
  }


  abrirModal(){

    let ngbModalOptions:ModalOptions = {
      backdrop : 'static',
      keyboard : false
    };

    this.modalRef = this.modalService.show(ModalEjemploComponent,ngbModalOptions);
    this.modalRef.content.onClose = (data) => {
      console.log(data);

      this.items.push(
        {
          id : data.id, nombre : data.nombres , producto : data.producto, descripcion : data.descripcion
        }
      );


      this.modalRef.hide();
    }
  }



}
