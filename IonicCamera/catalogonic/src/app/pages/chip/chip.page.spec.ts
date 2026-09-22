import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChipPage } from './chip.page';

describe('ChipPage', () => {
  let component: ChipPage;
  let fixture: ComponentFixture<ChipPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
