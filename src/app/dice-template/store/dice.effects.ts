import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { saveRoll } from './dice.actions';

@Injectable()
export class DiceEffects {
  saveRoll$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(saveRoll),
        tap(({ dice, total }) => {
          localStorage.setItem(
            'dice',
            JSON.stringify([
              { dice, total },
              ...JSON.parse(localStorage.getItem('dice') || '[]'),
            ])
          );
        })
      ),
    { dispatch: false }
  );
  constructor(private actions$: Actions) {}
}
