import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceActionsComponent } from './dice-actions.component';

describe('DiceActionsComponent', () => {
  let component: DiceActionsComponent;
  let fixture: ComponentFixture<DiceActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiceActionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiceActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
