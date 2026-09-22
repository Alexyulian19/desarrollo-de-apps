import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TogglePage } from './toggle.page';

describe('TogglePage', () => {
  let component: TogglePage;
  let fixture: ComponentFixture<TogglePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TogglePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
