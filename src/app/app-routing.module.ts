import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', 
    loadChildren: () => import('@modules/costumer-side/costumer-side.module').then(m => m.CostumerSideModule)
  },
  {
    path: 'administrator', loadChildren: () => import('@modules/administrator-side/administrator-side.module').then(m => m.AdministratorSideModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
