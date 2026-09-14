import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressIndicatorsPage } from './progress-indicators.page';

describe('ProgressIndicatorsPage', () => {
  let component: ProgressIndicatorsPage;
  let fixture: ComponentFixture<ProgressIndicatorsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressIndicatorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
