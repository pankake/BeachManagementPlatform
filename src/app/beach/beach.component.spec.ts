import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeachComponent } from './beach.component';

describe('PrenotationComponent', () => {
  let component: BeachComponent;
  let fixture: ComponentFixture<BeachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeachComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
