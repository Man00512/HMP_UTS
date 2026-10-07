import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { TentangPageModule } from './tentang.module';
import { TentangPage } from './tentang.page';

describe('TentangPage', () => {
  let component: TentangPage;
  let fixture: ComponentFixture<TentangPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TentangPageModule, RouterModule.forRoot([])],
    });
    fixture = TestBed.createComponent(TentangPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
