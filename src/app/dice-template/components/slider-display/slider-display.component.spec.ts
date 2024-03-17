import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderDisplayComponent } from './slider-display.component';

describe('SliderDisplayComponent', () => {
  let component: SliderDisplayComponent;
  let fixture: ComponentFixture<SliderDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderDisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SliderDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit countChange event when countValueChange is called', () => {
    component.count.setValue(5);
    spyOn(component.countChange, 'emit');
    component.countValueChange();
    expect(component.countChange.emit).toHaveBeenCalledWith(5);
  });
});
