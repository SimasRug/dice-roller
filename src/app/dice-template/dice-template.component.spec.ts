import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceTemplateComponent } from './dice-template.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('DiceTemplateComponent', () => {
  let component: DiceTemplateComponent;
  let fixture: ComponentFixture<DiceTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiceTemplateComponent],
      providers: [
        provideMockStore({
          initialState: { dice: { history: [], saved: [] } },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DiceTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
