import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpesaFormComponent } from './spesa-form.component';

describe('SpesaFormComponent', () => {
  let component: SpesaFormComponent;
  let fixture: ComponentFixture<SpesaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpesaFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpesaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
