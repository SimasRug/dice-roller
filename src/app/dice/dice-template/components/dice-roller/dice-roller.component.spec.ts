import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceRollerComponent } from './dice-roller.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { addToHistory, saveRoll } from '../../store/dice.actions';

describe('DiceRollerComponent', () => {
  let component: DiceRollerComponent;
  let fixture: ComponentFixture<DiceRollerComponent>;
  let store: MockStore;

  const initialState = { dice: { history: [], saved: [] } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiceRollerComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(DiceRollerComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change dice count', () => {
    component.diceCountChange(3);
    expect(component.dice.length).toBe(3);
  });

  it('should change die sides', () => {
    component.dieSideChange({ id: 0, sides: 8 });
    expect(component.dice[0].sides).toBe(8);
  });

  it('should roll dice, update total, and dispatch addToHistory action', () => {
    spyOn(Math, 'random').and.returnValue(0);
    const dispatchSpy = spyOn(store, 'dispatch');
    component.dice = [
      { id: 0, sides: 6, value: 1 },
      { id: 1, sides: 6, value: 1 },
    ]; // Two dice
    component.rollDice();
    expect(component.total).toBe(2);
    expect(dispatchSpy).toHaveBeenCalledWith(
      addToHistory(component.getDiceSides(component.dice), component.total || 0)
    );
  });

  it('should dispatch saveRoll action and disable save button if total is not 0', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const nextSpy = spyOn(component.saveDisabled, 'next');
    component.total = 5;
    component.save();
    expect(dispatchSpy).toHaveBeenCalledWith(
      saveRoll(component.getDiceSides(component.dice), component.total)
    );
    expect(nextSpy).toHaveBeenCalledWith(true);
  });

  it('should not dispatch saveRoll action or disable save button if total is 0', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const nextSpy = spyOn(component.saveDisabled, 'next');
    component.total = 0;
    component.save();
    expect(dispatchSpy).not.toHaveBeenCalled();
    expect(nextSpy).not.toHaveBeenCalled();
  });
});
