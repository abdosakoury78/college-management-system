import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpStudentComponent } from './help-student.component';

describe('HelpStudentComponent', () => {
  let component: HelpStudentComponent;
  let fixture: ComponentFixture<HelpStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
