import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { DiceHistoryComponent } from './dice-history.component';
import { ListType } from '../../models/enums';

describe('DiceHistoryComponent', () => {
  let component: DiceHistoryComponent;
  let fixture: ComponentFixture<DiceHistoryComponent>;
  let store: MockStore;

  const initialState = { dice: { history: [], saved: [] } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiceHistoryComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(DiceHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set listType to the provided type', () => {
    component.showList(ListType.SAVED);
    expect(component.listType).toBe('saved');
  });
});
