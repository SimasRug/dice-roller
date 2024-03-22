import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dice3dRollerComponent } from './dice3d-roller.component';

describe('Dice3dRollerComponent', () => {
  let component: Dice3dRollerComponent;
  let fixture: ComponentFixture<Dice3dRollerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dice3dRollerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Dice3dRollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
