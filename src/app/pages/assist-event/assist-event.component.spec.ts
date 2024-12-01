import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistEventComponent } from './assist-event.component';

describe('AssistEventComponent', () => {
  let component: AssistEventComponent;
  let fixture: ComponentFixture<AssistEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssistEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
