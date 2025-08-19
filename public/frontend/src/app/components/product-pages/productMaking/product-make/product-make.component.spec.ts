import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMakeComponent } from './product-make.component';

describe('ProductMakeComponent', () => {
  let component: ProductMakeComponent;
  let fixture: ComponentFixture<ProductMakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductMakeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductMakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
