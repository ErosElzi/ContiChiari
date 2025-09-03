import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeseListComponent } from './spese-list.component';

describe('SpeseListComponent', () => {
  let component: SpeseListComponent;
  let fixture: ComponentFixture<SpeseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeseListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
