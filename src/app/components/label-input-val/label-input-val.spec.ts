import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelInputVal } from './label-input-val';

describe('LabelInputVal', () => {
  let component: LabelInputVal;
  let fixture: ComponentFixture<LabelInputVal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelInputVal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelInputVal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
