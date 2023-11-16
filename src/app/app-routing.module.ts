import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BancaComponent } from './components/banca/banca.component';
import { UtentiComponent } from './components/utenti/utenti.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SelectBancaComponent } from './components/select-banca/select-banca.component';

const routes: Routes = [
  { path: 'selectBanca', component: SelectBancaComponent },
  {
    path: 'dashboard/:idBanca',
    component: DashboardComponent,
    children: [
      { path: 'dashboard/:idBanca', redirectTo: 'banche', pathMatch: 'full' },
      { path: 'banche', component: BancaComponent },
      { path: 'utenti', component: UtentiComponent },
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
