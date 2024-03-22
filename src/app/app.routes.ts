import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', redirectTo: 'dice-roller/2d', pathMatch: 'full' },
  {
    path: 'dice-roller',
    loadComponent: () =>
      import('./dice/dice-template/dice-template.component').then(
        (m) => m.DiceTemplateComponent
      ),
    children: [
      {
        path: '2d',
        loadComponent: () =>
          import(
            './dice/dice-template/components/dice-roller/dice-roller.component'
          ).then((m) => m.DiceRollerComponent),
      },
      {
        path: '3d',
        loadComponent: () =>
          import(
            './dice/dice-template/components/dice3d-roller/dice3d-roller.component'
          ).then((m) => m.Dice3dRollerComponent),
      },
    ],
  },
];
