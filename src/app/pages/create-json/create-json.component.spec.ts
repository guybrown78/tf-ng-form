import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJsonComponent } from './create-json.component';

describe('CreateJsonComponent', () => {
  let component: CreateJsonComponent;
  let fixture: ComponentFixture<CreateJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateJsonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
