import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtLibraryAngularPorfolioComponent } from './tt-library-angular-porfolio.component';

describe('TtLibraryAngularPorfolioComponent', () => {
  let component: TtLibraryAngularPorfolioComponent;
  let fixture: ComponentFixture<TtLibraryAngularPorfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TtLibraryAngularPorfolioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TtLibraryAngularPorfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
