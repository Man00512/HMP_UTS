import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { ProfilPageModule } from './profil.module';
import { ProfilPage } from './profil.page';

describe('ProfilPage', () => {
  let component: ProfilPage;
  let fixture: ComponentFixture<ProfilPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProfilPageModule, RouterModule.forRoot([])],
    });
    fixture = TestBed.createComponent(ProfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
