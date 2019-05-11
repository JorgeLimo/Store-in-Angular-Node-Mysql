import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/** Libs Internal **/
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http'; 
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { NoEncontradoComponent } from './components/no-encontrado/no-encontrado.component';

import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalEjemploComponent } from './components/inicio/modal-ejemplo/modal-ejemplo.component';


const routes: Routes = [
  {path: '', component: InicioComponent, canActivate:[AuthGuard]},
  {path: 'iniciar-sesion', component: LoginComponent, canActivate:[LoginGuard]},
  {path: 'usuarios', component: UsuariosComponent, canActivate:[AuthGuard]},
  {path: '**', component: NoEncontradoComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InicioComponent,
    FooterComponent,
    NavbarComponent,
    LoginComponent,
    UsuariosComponent,
    NoEncontradoComponent,
    ModalEjemploComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [AuthGuard, LoginGuard],
  entryComponents : [ModalEjemploComponent],
  bootstrap: [AppComponent]
})

export class AppModule { }
