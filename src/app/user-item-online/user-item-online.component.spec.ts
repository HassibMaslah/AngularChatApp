import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserItemOnlineComponent } from './user-item-online.component';

describe('UserItemOnlineComponent', () => {
  let component: UserItemOnlineComponent;
  let fixture: ComponentFixture<UserItemOnlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserItemOnlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserItemOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
