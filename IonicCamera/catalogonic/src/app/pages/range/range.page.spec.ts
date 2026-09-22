import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RangePage } from './range.page';

describe('RangePage', () => {
  let component: RangePage;
  let fixture: ComponentFixture<RangePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RangePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
