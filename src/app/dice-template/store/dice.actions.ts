import { createAction } from '@ngrx/store';

export const addToHistory = createAction(
  '[Dice] Add to History',
  (dice: string, total: number) => ({ dice, total })
);
export const saveRoll = createAction(
  '[Dice] Save Roll',
  (dice: string, total: number) => ({
    dice,
    total,
  })
);
