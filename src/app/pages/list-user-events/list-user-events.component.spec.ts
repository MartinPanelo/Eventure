import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserEventsComponent } from './list-user-events.component';

describe('ListUserEventsComponent', () => {
  let component: ListUserEventsComponent;
  let fixture: ComponentFixture<ListUserEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListUserEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUserEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
