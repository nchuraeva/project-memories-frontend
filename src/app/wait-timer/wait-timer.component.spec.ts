import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitTimerComponent } from './wait-timer.component';

describe('WaitTimerComponent', () => {
  let component: WaitTimerComponent;
  let fixture: ComponentFixture<WaitTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitTimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
