import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceHistoryListComponent } from './dice-history-list.component';

describe('DiceHistoryListComponent', () => {
  let component: DiceHistoryListComponent;
  let fixture: ComponentFixture<DiceHistoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiceHistoryListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiceHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
