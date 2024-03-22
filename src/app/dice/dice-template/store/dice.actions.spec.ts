import * as DiceActions from './dice.actions';

describe('Dice Actions', () => {
  it('should create addToHistory action', () => {
    const action = DiceActions.addToHistory('D6', 5);
    expect(action.type).toBe('[Dice] Add to History');
    expect(action.dice).toBe('D6');
    expect(action.total).toBe(5);
  });

  it('should create saveRoll action', () => {
    const action = DiceActions.saveRoll('D6', 5);
    expect(action.type).toBe('[Dice] Save Roll');
    expect(action.dice).toBe('D6');
    expect(action.total).toBe(5);
  });
});
