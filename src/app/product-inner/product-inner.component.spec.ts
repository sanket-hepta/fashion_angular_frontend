import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInnerComponent } from './product-inner.component';

describe('ProductInnerComponent', () => {
  let component: ProductInnerComponent;
  let fixture: ComponentFixture<ProductInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductInnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
