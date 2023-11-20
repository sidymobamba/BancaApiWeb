import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BancaComponent } from './components/banca/banca.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UtentiComponent } from './components/utenti/utenti.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SelectBancaComponent } from './components/select-banca/select-banca.component';
import { AddUtenteComponent } from './components/add-utente/add-utente.component';
import { EditUtenteComponent } from './components/edit-utente/edit-utente.component';
import { EditFuncComponent } from './components/edit-func/edit-func.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { DashboardUserComponent } from './components/dashboard-user/dashboard-user.component';
import { PrelievoComponent } from './components/prelievo/prelievo.component';
import { VersamentoComponent } from './components/versamento/versamento.component';
import { SaldoComponent } from './components/saldo/saldo.component';
import { RegistroOperazioniComponent } from './components/registro-operazioni/registro-operazioni.component';
import { ScektaGestioneComponent } from './components/scekta-gestione/scekta-gestione.component';

@NgModule({
  declarations: [
    AppComponent,
    BancaComponent,
    UtentiComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    SelectBancaComponent,
    AddUtenteComponent,
    EditUtenteComponent,
    EditFuncComponent,
    LoginUserComponent,
    DashboardUserComponent,
    PrelievoComponent,
    VersamentoComponent,
    SaldoComponent,
    RegistroOperazioniComponent,
    ScektaGestioneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    RouterModule,
    MatIconModule,
    HttpClientModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
  
  
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
