import { createReducer, createSelector, on } from '@ngrx/store';
import { addToHistory, saveRoll } from './dice.actions';

export interface DiceState {
  history: { dice: string; total: number }[];
  saved: { dice: string; total: number }[];
}

export const initialState: DiceState = {
  history: [],
  saved: JSON.parse(localStorage.getItem('dice') || '[]'),
};

export const diceReducer = createReducer(
  initialState,
  on(addToHistory, (state, { dice, total }) => ({
    ...state,
    history: [{ dice, total }, ...state.history],
  })),
  on(saveRoll, (state, { dice, total }) => ({
    ...state,
    saved: [{ dice, total }, ...state.saved],
  }))
);

const diceSelectors = createSelector(
  (state: { dice: DiceState }) => state.dice,
  (dice) => dice
);

export const historySelector = createSelector(
  diceSelectors,
  (dice) => dice.history
);

export const savedSelector = createSelector(
  diceSelectors,
  (dice) => dice.saved
);
