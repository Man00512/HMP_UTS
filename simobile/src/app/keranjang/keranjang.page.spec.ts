import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { KeranjangPageModule } from './keranjang.module';
import { KeranjangPage } from './keranjang.page';

describe('KeranjangPage', () => {
  let component: KeranjangPage;
  let fixture: ComponentFixture<KeranjangPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [KeranjangPageModule, RouterModule.forRoot([])],
    });
    fixture = TestBed.createComponent(KeranjangPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
