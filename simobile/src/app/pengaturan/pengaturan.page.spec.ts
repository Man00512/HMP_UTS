import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { PengaturanPageModule } from './pengaturan.module';
import { PengaturanPage } from './pengaturan.page';

describe('PengaturanPage', () => {
  let component: PengaturanPage;
  let fixture: ComponentFixture<PengaturanPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PengaturanPageModule, RouterModule.forRoot([])],
    });
    fixture = TestBed.createComponent(PengaturanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
