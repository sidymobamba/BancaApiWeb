import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BancaComponent } from './components/banca/banca.component';
import { UtentiComponent } from './components/utenti/utenti.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SelectBancaComponent } from './components/select-banca/select-banca.component';
import { AddUtenteComponent } from './components/add-utente/add-utente.component';
import { EditUtenteComponent } from './components/edit-utente/edit-utente.component';
import { EditFuncComponent } from './components/edit-func/edit-func.component';
import { DashboardUserComponent } from './components/dashboard-user/dashboard-user.component';
import { PrelievoComponent } from './components/prelievo/prelievo.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { VersamentoComponent } from './components/versamento/versamento.component';
import { SaldoComponent } from './components/saldo/saldo.component';
import { RegistroOperazioniComponent } from './components/registro-operazioni/registro-operazioni.component';
import { ScektaGestioneComponent } from './components/scekta-gestione/scekta-gestione.component';

const routes: Routes = [
  { path: 'selectBanca', component: SelectBancaComponent },
  { path: '', redirectTo: 'selectBanca', pathMatch: 'full' },
  { path: 'sceltaGestione/:idBanca', component: ScektaGestioneComponent },
  { path: 'dashboardUser/:idBanca', component: DashboardUserComponent, 
  children: [
    { path: '', redirectTo: 'prelievo', pathMatch: 'full' },
    { path: 'prelievo/:idUtente', component: PrelievoComponent },
    { path: 'versamento/:idUtente', component: VersamentoComponent },
    { path: 'saldo/:idUtente', component: SaldoComponent },
    { path: 'registroOperazioni/:idUtente', component: RegistroOperazioniComponent },
  
    ] 
  },
  { path: 'loginUser/:idBanca', component: LoginUserComponent },
  {path: 'dashboard/:idBanca', component: DashboardComponent,
  children: [
      { path: '', redirectTo: 'banche', pathMatch: 'full' },
      { path: 'banche', component: BancaComponent },
      { path: 'banche/edit/:idBanca', component: EditFuncComponent },
      { path: 'utenti', component: UtentiComponent}, 
      { path: 'utenti/add', component: AddUtenteComponent },
      { path: 'utenti/edit/:id', component: EditUtenteComponent }
    
    ],
  },
  { path: 'login/:idBanca', component: LoginComponent }, 
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
