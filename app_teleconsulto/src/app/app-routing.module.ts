import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./logged/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'consulto',
    loadChildren: () => import('./logged/consulto/consulto.module').then( m => m.ConsultoPageModule)
  },
  {
    path: 'nuovo',
    loadChildren: () => import('./logged/nuovo/nuovo.module').then( m => m.NuovoPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./access/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./access/registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'zoom-login',
    loadChildren: () => import('./logged/zoom/zoom-login/zoom-login.module').then( m => m.ZoomLoginPageModule)
  },
  {
    path: 'zoom-non-login',
    loadChildren: () => import('./logged/zoom/zoom-non-login/zoom-non-login.module').then( m => m.ZoomNonLoginPageModule)
  },
  {
    path: 'new-partecipant',
    loadChildren: () => import('./logged/new-partecipant/new-partecipant.module').then( m => m.NewPartecipantPageModule)
  },
  {
    path: 'new-paziente',
    loadChildren: () => import('./logged/new-paziente/new-paziente.module').then( m => m.NewPazientePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./logged/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./logged/chat/chat.module').then( m => m.ChatPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
