import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceSidesSelectorComponent } from './dice-sides-selector.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('DiceSidesSelectorComponent', () => {
  let component: DiceSidesSelectorComponent;
  let fixture: ComponentFixture<DiceSidesSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiceSidesSelectorComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DiceSidesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with input sides value', () => {
    component.sides = 8;
    component.ngOnInit();
    expect(component.form.value.sides).toBe(8);
  });

  it('should emit sidesChange event when sidesValueChange is called', () => {
    component.id = 1;
    component.form.setValue({ sides: 8 });
    spyOn(component.sidesChange, 'emit');
    component.sidesValueChange();
    expect(component.sidesChange.emit).toHaveBeenCalledWith({
      id: 1,
      sides: 8,
    });
  });
});
