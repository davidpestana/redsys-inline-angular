import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedsysComponent } from './redsys.component';

describe('RedsysComponent', () => {
  let component: RedsysComponent;
  let fixture: ComponentFixture<RedsysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedsysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedsysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
