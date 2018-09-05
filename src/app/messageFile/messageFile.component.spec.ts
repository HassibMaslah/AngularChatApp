import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageFile } from './messageFile.component';

describe('messageFile', () => {
  let component: MessageFile;
  let fixture: ComponentFixture<MessageFile>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageFile ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageFile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
