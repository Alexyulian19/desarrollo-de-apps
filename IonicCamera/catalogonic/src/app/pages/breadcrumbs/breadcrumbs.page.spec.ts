import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadcrumbsPage } from './breadcrumbs.page';

describe('BreadcrumbsPage', () => {
  let component: BreadcrumbsPage;
  let fixture: ComponentFixture<BreadcrumbsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
