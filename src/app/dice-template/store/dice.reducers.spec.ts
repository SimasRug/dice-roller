import { diceReducer, initialState } from './dice.reducers';
import * as DiceActions from './dice.actions';

describe('Dice Reducer', () => {
  it('should return the initial state', () => {
    const action = {} as any;
    const state = diceReducer(initialState, action);
    expect(state).toBe(initialState);
  });

  it('should add to history', () => {
    const action = DiceActions.addToHistory('D6', 5);
    const state = diceReducer(initialState, action);
    expect(state.history).toEqual([{ dice: 'D6', total: 5 }]);
  });

  it('should save roll', () => {
    const action = DiceActions.saveRoll('D6', 5);
    const state = diceReducer(initialState, action);
    expect(state.saved).toEqual([{ dice: 'D6', total: 5 }]);
  });
});
